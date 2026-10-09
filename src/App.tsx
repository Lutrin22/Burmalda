import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Plus, Edit2, Trash2, Check, X, MessageSquare, Copy, CheckCircle2, Sparkles, Loader2, Globe, Image as ImageIcon, Lock, LayoutList, ImagePlus, Palette, CornerDownRight, GripVertical, StickyNote, BookOpen, Video, Link2, AlertCircle, Maximize, Minimize, Shield, ShieldCheck, LogOut, Expand, Shrink, Cloud, CloudOff } from 'lucide-react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { uploadFile, deleteFile } from './config/supabase';

const CATEGORY_COLORS = {
  slate: { bg: 'bg-slate-500', border: 'border-slate-500/30', activeBorder: 'border-slate-500', hoverBg: 'hover:bg-slate-500/10' },
  purple: { bg: 'bg-purple-500', border: 'border-purple-500/30', activeBorder: 'border-purple-500', hoverBg: 'hover:bg-purple-500/10' },
  pink: { bg: 'bg-pink-500', border: 'border-pink-500/30', activeBorder: 'border-pink-500', hoverBg: 'hover:bg-pink-500/10' },
  blue: { bg: 'bg-blue-500', border: 'border-blue-500/30', activeBorder: 'border-blue-500', hoverBg: 'hover:bg-blue-500/10' },
  green: { bg: 'bg-green-500', border: 'border-green-500/30', activeBorder: 'border-green-500', hoverBg: 'hover:bg-green-500/10' },
  yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500/30', activeBorder: 'border-yellow-500', hoverBg: 'hover:bg-yellow-500/10' },
  red: { bg: 'bg-red-500', border: 'border-red-500/30', activeBorder: 'border-red-500', hoverBg: 'hover:bg-red-500/10' },
};

const DEFAULT_CATEGORIES = [
  {
    id: 'cat_1',
    name: 'Small talk / Знакомство с новым фаном',
    templates: [
      { id: 'tpl_1', text: 'Hey there! So glad you found my page. How is your day going so far? ✨', note: 'Use this as the very first message after they subscribe.' },
      { id: 'tpl_2', text: 'Welcome! I love getting to know new people here. Where are you from?' },
      { id: 'tpl_3', text: 'You have such a beautiful name, I haven\'t seen anyone with it in my country. Can I know where you from? 💖' },
      { id: 'tpl_4', text: 'Wow, that\'s a very cool country... I\'m sure people there are very nice. Do you have favorite ways to relax when you are tired? 😉' }
    ]
  },
  {
    id: 'cat_2',
    name: 'Transition to flirting / Перевод во флирт',
    templates: [
      { id: 'tpl_5', text: 'I like how it sounds 😋... Have you ever felt like you just want to drop everything and have some fun? 😏' },
      { id: 'tpl_6', text: 'Wow, how did you guess it right? 😳 I\'m thinking right about it... would you let me move closer to you? 💋' }
    ]
  },
  {
    id: 'cat_3',
    name: 'Flirting & Teasing / Флирт и Дразнилки',
    templates: [
      { id: 'tpl_8', text: 'I\'m on my knees right now, do you like it? 😏' },
      { id: 'tpl_10', text: 'I raise my eyes and see your face... Do you like the view? 👅', attachmentType: 'teaser', note: 'Attach a photo where you are looking up playfully without showing too much.' },
      { id: 'tpl_12', text: 'I want to show you something really special... are you ready? 🥵', attachmentType: 'ppv' }
    ]
  },
  {
    id: 'cat_4',
    name: 'After 1st sale / После 1-ой продажи',
    templates: [
      { id: 'tpl_13', text: 'Mmm, after that I just want to lay on the bed and relax with you babe 🥵' },
      { id: 'tpl_14', text: 'I beg you to be more gentle with me babe... Can you feel that? 🥵', attachmentType: 'teaser' },
      { id: 'tpl_16', text: 'Make me the one who craves for your attention 24/7 😍 LET\'S HAVE FUN TOGETHER BABE! 🥵😍💦', attachmentType: 'ppv' }
    ]
  }
];

const DEFAULT_GUIDE_CATEGORIES = [
  {
    id: 'gcat_1',
    name: 'Basics & Onboarding / Основы',
    guides: [
      { id: 'guide_1', title: 'Getting Started with Chatting', url: '', description: 'Initial orientation and understanding fan psychology.' }
    ]
  },
  {
    id: 'gcat_2',
    name: 'Advanced Sales / Продвинутые продажи',
    guides: []
  }
];

const DEFAULT_EXAMPLE_CATEGORIES = [
  {
    id: 'ecat_1',
    name: 'Teasers / Тизеры',
    examples: []
  },
  {
    id: 'ecat_2',
    name: 'PPV & Sales / PPV и Продажи',
    examples: []
  }
];

const TRANSLATIONS = {
  en: {
    title: 'Vice Doll',
    heroTitle1: 'Templates for',
    heroTitle2: 'chatting with fans',
    heroSubtitle: 'Learn the basics, organize your workflows, and seamlessly transition from small talk to high-ticket sales with curated, customizable templates.',
    stages: 'STAGES',
    newCategory: 'New Category',
    templatesAvailable: 'templates available',
    guidesAvailable: 'guides available',
    examplesAvailable: 'examples available',
    generateAI: 'Generate AI',
    addSnippet: 'Add Snippet',
    noTemplates: 'No templates in this category yet.',
    aiModalTitle: 'AI Template Generator',
    aiModalLabel: 'What kind of message do you need?',
    aiModalPlaceholder: 'E.g., A playful tease about staying up late...',
    generating: 'Generating...',
    generateBtn: 'Generate',
    generatedOptions: 'Generated Options',
    saveToCategory: 'Save to Category',
    typeTemplateHere: 'Type your template text here...',
    copy: 'Copy',
    copied: 'Copied!',
    teaser: 'Teaser Photo',
    ppv: 'PPV Message',
    templatesTab: 'Templates',
    guidesTab: 'Guides',
    examplesTab: 'Examples',
    addSubTheme: 'Add Sub-theme',
    addPhoto: 'Add Example Photo',
    descriptionPlaceholder: 'Describe what is happening in this photo...',
    noExamples: 'No examples in this category yet. Upload a photo to start.',
    chooseColor: 'Choose category color',
    addNote: 'Add Note',
    notePlaceholder: 'Add a private note (e.g., when to use this template)...',
    addGuide: 'Add Guide',
    guideTitlePlaceholder: 'Guide Title (e.g., "How to handle objections")',
    driveUrlPlaceholder: 'Paste Google Drive Link here...',
    guideDescPlaceholder: 'Add notes, timestamps, or descriptions for this video...',
    noGuides: 'No guides in this category yet. Add a Google Drive video to start learning.',
    publicLinkWarning: 'Make sure the Google Drive video access is set to "Anyone with the link".',
    adminLogin: 'Admin Login',
    adminLogout: 'Exit Admin',
    adminModalTitle: 'Administrator Login',
    adminPasswordLabel: 'Enter Admin Password',
    adminPasswordPlaceholder: 'Password...',
    loginBtn: 'Login',
    wrongPassword: 'Incorrect password',
    uploading: 'Uploading...',
    uploadError: 'Upload failed',
    uploadSuccess: 'Uploaded successfully',
    cloudStorageInfo: 'Cloud storage enabled',
    cloudStorageDisabled: 'Cloud storage disabled - using local storage',
    deleteConfirm: 'Delete this file?'
  },
  ru: {
    title: 'Vice Doll',
    heroTitle1: 'Шаблоны для',
    heroTitle2: 'общения с фанами',
    heroSubtitle: 'Изучите основы, организуйте рабочие процессы и плавно переходите от светской беседы к крупным продажам с помощью тщательно подобранных настраиваемых шаблонов.',
    stages: 'ЭТАПЫ',
    newCategory: 'Новая категория',
    templatesAvailable: 'шаблонов доступно',
    guidesAvailable: 'гайдов доступно',
    examplesAvailable: 'примеров доступно',
    generateAI: 'Сгенерировать ИИ',
    addSnippet: 'Добавить сниппет',
    noTemplates: 'В этой категории пока нет шаблонов.',
    aiModalTitle: 'Генератор шаблонов ИИ',
    aiModalLabel: 'Какое сообщение вам нужно?',
    aiModalPlaceholder: 'Например, игривая дразнилка о том, что вы засиделись допоздна...',
    generating: 'Генерация...',
    generateBtn: 'Сгенерировать',
    generatedOptions: 'Сгенерированные варианты',
    saveToCategory: 'Сохранить в категорию',
    typeTemplateHere: 'Введите текст шаблона здесь...',
    copy: 'Копировать',
    copied: 'Скопировано!',
    teaser: 'Тизерное фото',
    ppv: 'PPV / Продажа',
    templatesTab: 'Шаблоны',
    guidesTab: 'Гайды',
    examplesTab: 'Примеры',
    addSubTheme: 'Добавить под-тему',
    addPhoto: 'Добавить фото',
    descriptionPlaceholder: 'Опишите, что происходит на фото...',
    noExamples: 'В этой категории пока нет примеров. Загрузите фото, чтобы начать.',
    chooseColor: 'Выбрать цвет категории',
    addNote: 'Заметка',
    notePlaceholder: 'Добавьте личную заметку (например, когда использовать)...',
    addGuide: 'Добавить гайд',
    guideTitlePlaceholder: 'Название гайда (напр., "Как общаться с китами")',
    driveUrlPlaceholder: 'Вставьте ссылку на Google Диск сюда...',
    guideDescPlaceholder: 'Добавьте заметки, таймкоды или описание к этому видео...',
    noGuides: 'В этой категории пока нет гайдов. Добавьте видео с Google Диска, чтобы начать обучение.',
    publicLinkWarning: 'Убедитесь, что доступ к видео на Google Диске установлен на "Все, у кого есть ссылка".',
    adminLogin: 'Вход админа',
    adminLogout: 'Выйти из админки',
    adminModalTitle: 'Вход для администратора',
    adminPasswordLabel: 'Введите пароль администратора',
    adminPasswordPlaceholder: 'Пароль...',
    loginBtn: 'Войти',
    wrongPassword: 'Неверный пароль',
    uploading: 'Загрузка...',
    uploadError: 'Ошибка загрузки',
    uploadSuccess: 'Успешно загружено',
    cloudStorageInfo: 'Облачное хранилище включено',
    cloudStorageDisabled: 'Облачное хранилище отключено - используется локальное хранилище',
    deleteConfirm: 'Удалить этот файл?'
  },
  uk: {
    title: 'Vice Doll',
    heroTitle1: 'Шаблони для',
    heroTitle2: 'спілкування з фанами',
    heroSubtitle: 'Вивчіть основи, організуйте робочі процеси та плавно переходьте від світської бесіди до великих продажів за допомогою ретельно підібраних шаблонів, що налаштовуються.',
    stages: 'ЕТАПИ',
    newCategory: 'Нова категорія',
    templatesAvailable: 'шаблонів доступно',
    guidesAvailable: 'гайдів доступно',
    examplesAvailable: 'прикладів доступно',
    generateAI: 'Згенерувати ШІ',
    addSnippet: 'Додати сніпет',
    noTemplates: 'У цій категорії поки немає шаблонів.',
    aiModalTitle: 'Генератор шаблонів ШІ',
    aiModalLabel: 'Яке повідомлення потрібно?',
    aiModalPlaceholder: 'Наприклад, грайлива дражнилка про те, що ви засиділися допізна...',
    generating: 'Генерація...',
    generateBtn: 'Згенерувати',
    generatedOptions: 'Згенеровані варіанти',
    saveToCategory: 'Зберегти в категорію',
    typeTemplateHere: 'Введіть текст шаблону тут...',
    copy: 'Копировать',
    copied: 'Скопировано!',
    teaser: 'Тизерне фото',
    ppv: 'PPV / Продаж',
    templatesTab: 'Шаблони',
    guidesTab: 'Гайди',
    examplesTab: 'Приклади',
    addSubTheme: 'Додати підтему',
    addPhoto: 'Додати фото',
    descriptionPlaceholder: 'Опишіть, що відбувається на фото...',
    noExamples: 'У цій категорії поки немає прикладів. Завантажте фото, щоб почати.',
    chooseColor: 'Обрати колір категорії',
    addNote: 'Нотатка',
    notePlaceholder: 'Додайте особисту нотатку (наприклад, коли використовувати)...',
    addGuide: 'Додати гайд',
    guideTitlePlaceholder: 'Назва гайда (напр., "Як спілкуватися з китами")',
    driveUrlPlaceholder: 'Вставте посилання на Google Диск сюди...',
    guideDescPlaceholder: 'Додайте нотатки, таймкоди або опис до цього відео...',
    noGuides: 'У цій категорії поки немає гайдів. Додайте відео з Google Диска, щоб розпочати навчання.',
    publicLinkWarning: 'Переконайтеся, що доступ до відео на Google Диску встановлено на "Усі, хто має посилання".',
    adminLogin: 'Вхід адміна',
    adminLogout: 'Вийти з адмінки',
    adminModalTitle: 'Вхід для адміністратора',
    adminPasswordLabel: 'Введіть пароль адміністратора',
    adminPasswordPlaceholder: 'Пароль...',
    loginBtn: 'Увійти',
    wrongPassword: 'Неправильний пароль',
    uploading: 'Завантаження...',
    uploadError: 'Помилка завантаження',
    uploadSuccess: 'Успішно завантажено',
    cloudStorageInfo: 'Хмарне сховище включено',
    cloudStorageDisabled: 'Хмарне сховище відключено - використовується локальне сховище',
    deleteConfirm: 'Видалити цей файл?'
  }
};

export default function ViceDollApp() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('en');
  const t = TRANSLATIONS[language];

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Cloud storage status
  const [isCloudEnabled, setIsCloudEnabled] = useState(false);
  const [uploadingIds, setUploadingIds] = useState<Set<string>>(new Set());

  const [categories, setCategories] = useState(() => 
    DEFAULT_CATEGORIES.map(c => ({...c, parentId: c.parentId || null, color: c.color || 'slate'}))
  );
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORIES[0].id);

  const [guideCategories, setGuideCategories] = useState(() => 
    DEFAULT_GUIDE_CATEGORIES.map(c => ({...c, parentId: c.parentId || null, color: c.color || 'purple'}))
  );
  const [activeGuideCategoryId, setActiveGuideCategoryId] = useState(DEFAULT_GUIDE_CATEGORIES[0].id);

  const [exampleCategories, setExampleCategories] = useState(() => 
    DEFAULT_EXAMPLE_CATEGORIES.map(c => ({...c, parentId: c.parentId || null, color: c.color || 'blue'}))
  );
  const [activeExampleCategoryId, setActiveExampleCategoryId] = useState(DEFAULT_EXAMPLE_CATEGORIES[0].id);

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  
  const [activeTab, setActiveTab] = useState('templates');
  const [expandedGuides, setExpandedGuides] = useState({});
  const [fullscreenVideoUrl, setFullscreenVideoUrl] = useState(null);
  const [showColorPickerFor, setShowColorPickerFor] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');

  // Check cloud storage on mount
  useEffect(() => {
    // Проверяем, доступна ли облачная конфигурация
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    setIsCloudEnabled(!!url && !!key);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const cycleLanguage = () => {
    const langs = ['en', 'ru', 'uk'];
    const currentIndex = langs.indexOf(language);
    setLanguage(langs[(currentIndex + 1) % langs.length]);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'burmalda') {
      setIsAdmin(true);
      setIsAdminModalOpen(false);
      setAdminPasswordInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // Category management for all tabs
  const handleAddCategory = () => {
    if (!isAdmin) return;
    const newId = `cat_${Date.now()}`;
    if (activeTab === 'templates') {
      const newCategory = { id: newId, name: t.newCategory, templates: [], color: 'slate', parentId: null };
      setCategories([...categories, newCategory]);
      setActiveCategoryId(newId);
    } else if (activeTab === 'guides') {
      const newCategory = { id: newId, name: t.newCategory, guides: [], color: 'purple', parentId: null };
      setGuideCategories([...guideCategories, newCategory]);
      setActiveGuideCategoryId(newId);
    } else if (activeTab === 'examples') {
      const newCategory = { id: newId, name: t.newCategory, examples: [], color: 'blue', parentId: null };
      setExampleCategories([...exampleCategories, newCategory]);
      setActiveExampleCategoryId(newId);
    }
    startEditingCategory(newId, t.newCategory);
  };

  const startEditingCategory = (id, currentName) => {
    if (!isAdmin) return;
    setEditingCategoryId(id);
    setEditingCategoryName(currentName);
  };

  const saveCategoryName = () => {
    if (!isAdmin) return;
    if (editingCategoryName.trim() === '') return cancelEditingCategory();
    if (activeTab === 'templates') {
      setCategories(categories.map(c => 
        c.id === editingCategoryId ? { ...c, name: editingCategoryName } : c
      ));
    } else if (activeTab === 'guides') {
      setGuideCategories(guideCategories.map(c => 
        c.id === editingCategoryId ? { ...c, name: editingCategoryName } : c
      ));
    } else if (activeTab === 'examples') {
      setExampleCategories(exampleCategories.map(c => 
        c.id === editingCategoryId ? { ...c, name: editingCategoryName } : c
      ));
    }
    setEditingCategoryId(null);
  };

  const cancelEditingCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const deleteCategory = (id) => {
    if (!isAdmin) return;
    if (activeTab === 'templates') {
      const idsToDelete = [id, ...categories.filter(c => c.parentId === id).map(c => c.id)];
      const updated = categories.filter(c => !idsToDelete.includes(c.id));
      setCategories(updated);
      if (idsToDelete.includes(activeCategoryId) && updated.length > 0) {
        setActiveCategoryId(updated[0].id);
      }
    } else if (activeTab === 'guides') {
      const idsToDelete = [id, ...guideCategories.filter(c => c.parentId === id).map(c => c.id)];
      const updated = guideCategories.filter(c => !idsToDelete.includes(c.id));
      setGuideCategories(updated);
      if (idsToDelete.includes(activeGuideCategoryId) && updated.length > 0) {
        setActiveGuideCategoryId(updated[0].id);
      }
    } else if (activeTab === 'examples') {
      const idsToDelete = [id, ...exampleCategories.filter(c => c.parentId === id).map(c => c.id)];
      const updated = exampleCategories.filter(c => !idsToDelete.includes(c.id));
      setExampleCategories(updated);
      if (idsToDelete.includes(activeExampleCategoryId) && updated.length > 0) {
        setActiveExampleCategoryId(updated[0].id);
      }
    }
  };

  const handleAddSubCategory = (parentId, e) => {
    e.stopPropagation();
    if (!isAdmin) return;
    const newId = `sub_${Date.now()}`;
    if (activeTab === 'templates') {
      const parentCat = categories.find(c => c.id === parentId);
      const newCategory = { id: newId, name: t.addSubTheme, parentId: parentId, color: parentCat?.color || 'slate', templates: [] };
      setCategories([...categories, newCategory]);
      setActiveCategoryId(newId);
    } else if (activeTab === 'guides') {
      const parentCat = guideCategories.find(c => c.id === parentId);
      const newCategory = { id: newId, name: t.addSubTheme, parentId: parentId, color: parentCat?.color || 'purple', guides: [] };
      setGuideCategories([...guideCategories, newCategory]);
      setActiveGuideCategoryId(newId);
    } else if (activeTab === 'examples') {
      const parentCat = exampleCategories.find(c => c.id === parentId);
      const newCategory = { id: newId, name: t.addSubTheme, parentId: parentId, color: parentCat?.color || 'blue', examples: [] };
      setExampleCategories([...exampleCategories, newCategory]);
      setActiveExampleCategoryId(newId);
    }
    startEditingCategory(newId, t.addSubTheme);
  };

  const updateCategoryColor = (id, colorId, e) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (activeTab === 'templates') {
      setCategories(categories.map(c => c.id === id ? { ...c, color: colorId } : c));
    } else if (activeTab === 'guides') {
      setGuideCategories(guideCategories.map(c => c.id === id ? { ...c, color: colorId } : c));
    } else if (activeTab === 'examples') {
      setExampleCategories(exampleCategories.map(c => c.id === id ? { ...c, color: colorId } : c));
    }
    setShowColorPickerFor(null);
  };

  // Examples management with cloud upload
  const handleImageUpload = async (categoryId: any, e: any) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file) {
      const uploadId = `upload_${Date.now()}`;
      setUploadingIds(new Set([...uploadingIds, uploadId]));

      try {
        let imageUrl: string | null = null;

        // Try cloud upload if enabled (но только если supabase инициализирован)
        if (isCloudEnabled && uploadFile) {
          imageUrl = await uploadFile(file, 'examples', categoryId);
        }

        // Fallback to base64 if cloud upload fails or is disabled
        if (!imageUrl) {
          const reader = new FileReader();
          reader.onloadend = () => {
            imageUrl = reader.result as string;
            const newEx = { id: `ex_${Date.now()}`, image: imageUrl, description: '', isCloud: false };
            setExampleCategories(exampleCategories.map(c => {
              if (c.id === categoryId) {
                return { ...c, examples: [newEx, ...c.examples] };
              }
              return c;
            }));
            setUploadingIds(prev => {
              const newSet = new Set(prev);
              newSet.delete(uploadId);
              return newSet;
            });
          };
          reader.readAsDataURL(file);
        } else {
          const newEx = { id: `ex_${Date.now()}`, image: imageUrl, description: '', isCloud: true };
          setExampleCategories(exampleCategories.map(c => {
            if (c.id === categoryId) {
              return { ...c, examples: [newEx, ...c.examples] };
            }
            return c;
          }));
          setUploadingIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(uploadId);
            return newSet;
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        setUploadingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(uploadId);
          return newSet;
        });
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateExample = (categoryId, exampleId, description) => {
    if (!isAdmin) return;
    setExampleCategories(exampleCategories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          examples: c.examples.map(ex => ex.id === exampleId ? { ...ex, description } : ex)
        };
      }
      return c;
    }));
  };

  const deleteExample = async (categoryId: any, exampleId: any) => {
    if (!isAdmin) return;
    const example = exampleCategories.find(c => c.id === categoryId)?.examples.find(ex => ex.id === exampleId);
    
    if (example?.isCloud && isCloudEnabled && deleteFile) {
      await deleteFile('examples', example.image);
    }

    setExampleCategories(exampleCategories.map(c => {
      if (c.id === categoryId) {
        return { ...c, examples: c.examples.filter(ex => ex.id !== exampleId) };
      }
      return c;
    }));
  };

  // Guides management
  const handleAddGuide = (categoryId) => {
    if (!isAdmin) return;
    const newGuide = { id: `guide_${Date.now()}`, title: '', url: '', description: '' };
    setGuideCategories(guideCategories.map(c => {
      if (c.id === categoryId) {
        return { ...c, guides: [newGuide, ...c.guides] };
      }
      return c;
    }));
  };

  const updateGuide = (categoryId, guideId, updates) => {
    if (!isAdmin) return;
    setGuideCategories(guideCategories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          guides: c.guides.map(g => g.id === guideId ? { ...g, ...updates } : g)
        };
      }
      return c;
    }));
  };

  const deleteGuide = async (categoryId, guideId) => {
    if (!isAdmin) return;
    const guide = guideCategories.find(c => c.id === categoryId)?.guides.find(g => g.id === guideId);
    
    if (guide?.url && guide.isCloud && isCloudEnabled) {
      await deleteFile('guides', guide.url);
    }

    setGuideCategories(guideCategories.map(c => {
      if (c.id === categoryId) {
        return { ...c, guides: c.guides.filter(g => g.id !== guideId) };
      }
      return c;
    }));
  };

  const toggleGuideExpand = (id) => {
    setExpandedGuides(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const extractDriveId = (url) => {
    if (!url) return null;
    try {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) return match[1];
      const urlObj = new URL(url);
      return urlObj.searchParams.get('id');
    } catch (e) {
      return null;
    }
  };

  // Templates management
  const handleAddTemplate = (categoryId) => {
    if (!isAdmin) return;
    const newTemplate = { id: `tpl_${Date.now()}`, text: '' };
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, templates: [newTemplate, ...c.templates] };
      }
      return c;
    }));
  };

  const addSpecificTemplate = (categoryId, text) => {
    if (!isAdmin) return;
    const newTemplate = { id: `tpl_${Date.now()}`, text: text };
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, templates: [newTemplate, ...c.templates] };
      }
      return c;
    }));
  };

  const updateTemplate = (categoryId, templateId, updates) => {
    if (!isAdmin) return;
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          templates: c.templates.map(tmpl => tmpl.id === templateId ? { ...tmpl, ...updates } : tmpl)
        };
      }
      return c;
    }));
  };

  const deleteTemplate = (categoryId, templateId) => {
    if (!isAdmin) return;
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, templates: c.templates.filter(t => t.id !== templateId) };
      }
      return c;
    }));
  };

  const handleReorder = (categoryId, newTemplates) => {
    if (!isAdmin) return;
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, templates: newTemplates };
      }
      return c;
    }));
  };

  const generateAITemplate = async () => {
    if (!isAdmin || !aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiResult('');
    
    const activeCat = categories.find(c => c.id === activeCategoryId);
    const context = activeCat ? activeCat.name : 'general chatting';

    const systemPrompt = `You are an expert copywriter for OnlyFans creators. Your goal is to write engaging, high-converting chat messages. 
    The current context/stage of the conversation is: "${context}".
    The target language is: ${language === 'en' ? 'English' : language === 'ru' ? 'Russian' : 'Ukrainian'}.
    Create 1-3 short, natural-sounding message templates based on the user's prompt. 
    Keep them authentic and ready to use. Separate multiple options with "---".`;

    const userQuery = aiPrompt;
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            setAiResult(candidate.content.parts[0].text);
        } else {
            setAiResult("Error generating templates. Please try again.");
        }
    } catch (error) {
        console.error("API Error:", error);
        setAiResult("Failed to connect to the AI service.");
    } finally {
        setIsGenerating(false);
    }
  };

  const saveAiResult = (text) => {
      if(isAdmin && activeCategoryId) {
          addSpecificTemplate(activeCategoryId, text.trim());
          setIsAIModalOpen(false);
          setAiPrompt('');
          setAiResult('');
      }
  }

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const activeGuideCategory = guideCategories.find(c => c.id === activeGuideCategoryId);
  const activeExampleCategory = exampleCategories.find(c => c.id === activeExampleCategoryId);

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-500 font-sans ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background ambient gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-30 ${isDark ? 'bg-purple-900' : 'bg-purple-200'}`} />
        <div className={`absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-pink-900' : 'bg-pink-200'}`} />
      </div>

      {/* Top Header Fixed */}
      <header className="relative z-20 flex-none px-6 py-4 flex justify-between items-center border-b border-opacity-10 backdrop-blur-md bg-opacity-80 border-slate-500/20">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hidden md:block">
            {t.title}
          </h1>
        </motion.div>

        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl mx-auto">
          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'templates' ? (isDark ? 'bg-slate-800 text-white shadow' : 'bg-white text-slate-900 shadow') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <LayoutList className="w-4 h-4" />
            <span className="hidden sm:inline">{t.templatesTab}</span>
          </button>
          <button 
            onClick={() => setActiveTab('guides')}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'guides' ? (isDark ? 'bg-slate-800 text-white shadow' : 'bg-white text-slate-900 shadow') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">{t.guidesTab}</span>
          </button>
          <button 
            onClick={() => setActiveTab('examples')}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'examples' ? (isDark ? 'bg-slate-800 text-white shadow' : 'bg-white text-slate-900 shadow') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.examplesTab}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Cloud storage indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium ${
              isCloudEnabled
                ? isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isDark ? 'bg-slate-700/50 text-slate-400 border border-slate-600' : 'bg-slate-200 text-slate-600 border border-slate-300'
            }`}
            title={isCloudEnabled ? t.cloudStorageInfo : t.cloudStorageDisabled}
          >
            {isCloudEnabled ? (
              <>
                <Cloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cloud</span>
              </>
            ) : (
              <>
                <CloudOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Local</span>
              </>
            )}
          </motion.div>

          {isAdmin ? (
            <button
              onClick={() => setIsAdmin(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.adminLogout}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-black/5 border-black/10 text-slate-700 hover:bg-black/10'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.adminLogin}</span>
            </button>
          )}

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={cycleLanguage}
            className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border transition-all ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300' 
                : 'bg-black/5 border-black/10 hover:bg-black/10 text-slate-700'
            }`}
            title="Change Language"
          >
            <span className="text-xs font-bold uppercase">{language}</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-yellow-300' 
                : 'bg-black/5 border-black/10 hover:bg-black/10 text-slate-700'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>
      </header>

      {/* Main Content Area (Sidebar + Editor) */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        
        {/* Sidebar (Fixed on Desktop) - Active for all tabs */}
        <aside className={`flex-none w-72 overflow-y-auto border-r transition-colors ${
          isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white/70 border-slate-200'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold tracking-wide uppercase opacity-70">{t.stages}</h3>
              {isAdmin && (
                <button 
                  onClick={handleAddCategory}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity shadow-md shadow-pink-500/20"
                  title="Add Category"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {activeTab === 'templates' && categories.filter(c => !c.parentId).map((cat) => {
                const colorConfig = CATEGORY_COLORS[cat.color || 'slate'];
                const isCatActive = activeCategoryId === cat.id;
                
                return (
                <div key={cat.id} className="relative">
                  <div 
                    className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-l-4 ${colorConfig.hoverBg} ${
                      isCatActive 
                        ? (isDark ? `bg-white/10 shadow-inner text-white ${colorConfig.activeBorder}` : `bg-slate-100 shadow-sm text-slate-900 ${colorConfig.activeBorder}`) 
                        : `border-transparent ${isDark ? 'text-slate-400' : 'text-slate-600'}`
                    }`}
                    onClick={() => setActiveCategoryId(cat.id)}
                  >
                    {editingCategoryId === cat.id ? (
                      <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()}
                          autoFocus
                          className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 focus:border-purple-400 text-white' : 'border-purple-500/30 focus:border-purple-600 text-black'}`}
                        />
                        <button onClick={saveCategoryName} className="text-green-500 hover:text-green-400"><Check className="w-4 h-4" /></button>
                        <button onClick={cancelEditingCategory} className="text-red-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium truncate pr-2">{cat.name}</span>
                        {isAdmin && (
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setShowColorPickerFor(showColorPickerFor === cat.id ? null : cat.id); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.chooseColor}
                            >
                              <Palette className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => handleAddSubCategory(cat.id, e)}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.addSubTheme}
                            >
                              <CornerDownRight className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); startEditingCategory(cat.id, cat.name); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                            >
                              <Edit2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                              className={`p-1 rounded-md hover:text-red-500 hover:bg-black/10 ${isDark ? 'hover:bg-white/20 hover:text-red-400' : ''}`}
                            >
                              <Trash2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {isAdmin && showColorPickerFor === cat.id && (
                       <div className={`absolute left-0 top-full mt-2 p-2 rounded-xl border shadow-xl flex gap-1 z-50 ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`} onClick={e => e.stopPropagation()}>
                          {Object.entries(CATEGORY_COLORS).map(([colorId, colors]) => (
                             <button key={colorId} onClick={(e) => updateCategoryColor(cat.id, colorId, e)} className={`w-5 h-5 rounded-full hover:scale-110 transition-transform ${colors.bg}`} />
                          ))}
                       </div>
                    )}
                  </div>
                  
                  <div className={`ml-4 pl-2 space-y-1 mt-1 border-l-2 ${colorConfig.border}`}>
                    {categories.filter(c => c.parentId === cat.id).map(subCat => {
                       const isSubCatActive = activeCategoryId === subCat.id;
                       return (
                        <div 
                          key={subCat.id}
                          className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                            isSubCatActive 
                              ? (isDark ? `bg-white/10 shadow-inner text-white` : `bg-slate-100 shadow-sm text-slate-900`) 
                              : (isDark ? `text-slate-400 hover:bg-white/5` : `text-slate-600 hover:bg-slate-50`)
                          }`}
                          onClick={() => setActiveCategoryId(subCat.id)}
                        >
                          {editingCategoryId === subCat.id ? (
                             <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                              <input type="text" value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()} autoFocus className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 text-white' : 'border-purple-500/30 text-black'}`} />
                              <button onClick={saveCategoryName} className="text-green-500"><Check className="w-3.5 h-3.5" /></button>
                              <button onClick={cancelEditingCategory} className="text-red-500"><X className="w-3.5 h-3.5" /></button>
                            </div>
                          ) : (
                            <>
                              <span className="text-xs font-medium truncate pr-2 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${colorConfig.bg}`}></span>
                                {subCat.name}
                              </span>
                              {isAdmin && (
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                  <button onClick={(e) => { e.stopPropagation(); startEditingCategory(subCat.id, subCat.name); }} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/20"><Edit2 className="w-3 h-3 opacity-70" /></button>
                                  <button onClick={(e) => { e.stopPropagation(); deleteCategory(subCat.id); }} className="p-1 rounded-md hover:text-red-500 hover:bg-black/10 dark:hover:bg-white/20"><Trash2 className="w-3 h-3 opacity-70" /></button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                       )
                    })}
                  </div>
                </div>
              )})}

              {activeTab === 'guides' && guideCategories.filter(c => !c.parentId).map((cat) => {
                const colorConfig = CATEGORY_COLORS[cat.color || 'purple'];
                const isCatActive = activeGuideCategoryId === cat.id;
                
                return (
                <div key={cat.id} className="relative">
                  <div 
                    className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-l-4 ${colorConfig.hoverBg} ${
                      isCatActive 
                        ? (isDark ? `bg-white/10 shadow-inner text-white ${colorConfig.activeBorder}` : `bg-slate-100 shadow-sm text-slate-900 ${colorConfig.activeBorder}`) 
                        : `border-transparent ${isDark ? 'text-slate-400' : 'text-slate-600'}`
                    }`}
                    onClick={() => setActiveGuideCategoryId(cat.id)}
                  >
                    {editingCategoryId === cat.id ? (
                      <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()}
                          autoFocus
                          className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 focus:border-purple-400 text-white' : 'border-purple-500/30 focus:border-purple-600 text-black'}`}
                        />
                        <button onClick={saveCategoryName} className="text-green-500 hover:text-green-400"><Check className="w-4 h-4" /></button>
                        <button onClick={cancelEditingCategory} className="text-red-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium truncate pr-2">{cat.name}</span>
                        {isAdmin && (
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setShowColorPickerFor(showColorPickerFor === cat.id ? null : cat.id); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.chooseColor}
                            >
                              <Palette className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => handleAddSubCategory(cat.id, e)}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.addSubTheme}
                            >
                              <CornerDownRight className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); startEditingCategory(cat.id, cat.name); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                            >
                              <Edit2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                              className={`p-1 rounded-md hover:text-red-500 hover:bg-black/10 ${isDark ? 'hover:bg-white/20 hover:text-red-400' : ''}`}
                            >
                              <Trash2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {isAdmin && showColorPickerFor === cat.id && (
                       <div className={`absolute left-0 top-full mt-2 p-2 rounded-xl border shadow-xl flex gap-1 z-50 ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`} onClick={e => e.stopPropagation()}>
                          {Object.entries(CATEGORY_COLORS).map(([colorId, colors]) => (
                             <button key={colorId} onClick={(e) => updateCategoryColor(cat.id, colorId, e)} className={`w-5 h-5 rounded-full hover:scale-110 transition-transform ${colors.bg}`} />
                          ))}
                       </div>
                    )}
                  </div>
                  
                  <div className={`ml-4 pl-2 space-y-1 mt-1 border-l-2 ${colorConfig.border}`}>
                    {guideCategories.filter(c => c.parentId === cat.id).map(subCat => {
                       const isSubCatActive = activeGuideCategoryId === subCat.id;
                       return (
                        <div 
                          key={subCat.id}
                          className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                            isSubCatActive 
                              ? (isDark ? `bg-white/10 shadow-inner text-white` : `bg-slate-100 shadow-sm text-slate-900`) 
                              : (isDark ? `text-slate-400 hover:bg-white/5` : `text-slate-600 hover:bg-slate-50`)
                          }`}
                          onClick={() => setActiveGuideCategoryId(subCat.id)}
                        >
                          {editingCategoryId === subCat.id ? (
                             <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                              <input type="text" value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()} autoFocus className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 text-white' : 'border-purple-500/30 text-black'}`} />
                              <button onClick={saveCategoryName} className="text-green-500"><Check className="w-3.5 h-3.5" /></button>
                              <button onClick={cancelEditingCategory} className="text-red-500"><X className="w-3.5 h-3.5" /></button>
                            </div>
                          ) : (
                            <>
                              <span className="text-xs font-medium truncate pr-2 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${colorConfig.bg}`}></span>
                                {subCat.name}
                              </span>
                              {isAdmin && (
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                  <button onClick={(e) => { e.stopPropagation(); startEditingCategory(subCat.id, subCat.name); }} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/20"><Edit2 className="w-3 h-3 opacity-70" /></button>
                                  <button onClick={(e) => { e.stopPropagation(); deleteCategory(subCat.id); }} className="p-1 rounded-md hover:text-red-500 hover:bg-black/10 dark:hover:bg-white/20"><Trash2 className="w-3 h-3 opacity-70" /></button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                       )
                    })}
                  </div>
                </div>
              )})}

              {activeTab === 'examples' && exampleCategories.filter(c => !c.parentId).map((cat) => {
                const colorConfig = CATEGORY_COLORS[cat.color || 'blue'];
                const isCatActive = activeExampleCategoryId === cat.id;
                
                return (
                <div key={cat.id} className="relative">
                  <div 
                    className={`group relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-l-4 ${colorConfig.hoverBg} ${
                      isCatActive 
                        ? (isDark ? `bg-white/10 shadow-inner text-white ${colorConfig.activeBorder}` : `bg-slate-100 shadow-sm text-slate-900 ${colorConfig.activeBorder}`) 
                        : `border-transparent ${isDark ? 'text-slate-400' : 'text-slate-600'}`
                    }`}
                    onClick={() => setActiveExampleCategoryId(cat.id)}
                  >
                    {editingCategoryId === cat.id ? (
                      <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()}
                          autoFocus
                          className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 focus:border-purple-400 text-white' : 'border-purple-500/30 focus:border-purple-600 text-black'}`}
                        />
                        <button onClick={saveCategoryName} className="text-green-500 hover:text-green-400"><Check className="w-4 h-4" /></button>
                        <button onClick={cancelEditingCategory} className="text-red-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-medium truncate pr-2">{cat.name}</span>
                        {isAdmin && (
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setShowColorPickerFor(showColorPickerFor === cat.id ? null : cat.id); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.chooseColor}
                            >
                              <Palette className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => handleAddSubCategory(cat.id, e)}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                              title={t.addSubTheme}
                            >
                              <CornerDownRight className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); startEditingCategory(cat.id, cat.name); }}
                              className={`p-1 rounded-md hover:bg-black/10 ${isDark ? 'hover:bg-white/20' : ''}`}
                            >
                              <Edit2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                              className={`p-1 rounded-md hover:text-red-500 hover:bg-black/10 ${isDark ? 'hover:bg-white/20 hover:text-red-400' : ''}`}
                            >
                              <Trash2 className="w-3.5 h-3.5 opacity-70" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    {isAdmin && showColorPickerFor === cat.id && (
                       <div className={`absolute left-0 top-full mt-2 p-2 rounded-xl border shadow-xl flex gap-1 z-50 ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`} onClick={e => e.stopPropagation()}>
                          {Object.entries(CATEGORY_COLORS).map(([colorId, colors]) => (
                             <button key={colorId} onClick={(e) => updateCategoryColor(cat.id, colorId, e)} className={`w-5 h-5 rounded-full hover:scale-110 transition-transform ${colors.bg}`} />
                          ))}
                       </div>
                    )}
                  </div>
                  
                  <div className={`ml-4 pl-2 space-y-1 mt-1 border-l-2 ${colorConfig.border}`}>
                    {exampleCategories.filter(c => c.parentId === cat.id).map(subCat => {
                       const isSubCatActive = activeExampleCategoryId === subCat.id;
                       return (
                        <div 
                          key={subCat.id}
                          className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                            isSubCatActive 
                              ? (isDark ? `bg-white/10 shadow-inner text-white` : `bg-slate-100 shadow-sm text-slate-900`) 
                              : (isDark ? `text-slate-400 hover:bg-white/5` : `text-slate-600 hover:bg-slate-50`)
                          }`}
                          onClick={() => setActiveExampleCategoryId(subCat.id)}
                        >
                          {editingCategoryId === subCat.id ? (
                             <div className="flex items-center w-full gap-2" onClick={e => e.stopPropagation()}>
                              <input type="text" value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveCategoryName()} autoFocus className={`w-full bg-transparent border-b outline-none px-1 text-sm ${isDark ? 'border-purple-500/50 text-white' : 'border-purple-500/30 text-black'}`} />
                              <button onClick={saveCategoryName} className="text-green-500"><Check className="w-3.5 h-3.5" /></button>
                              <button onClick={cancelEditingCategory} className="text-red-500"><X className="w-3.5 h-3.5" /></button>
                            </div>
                          ) : (
                            <>
                              <span className="text-xs font-medium truncate pr-2 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${colorConfig.bg}`}></span>
                                {subCat.name}
                              </span>
                              {isAdmin && (
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                  <button onClick={(e) => { e.stopPropagation(); startEditingCategory(subCat.id, subCat.name); }} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/20"><Edit2 className="w-3 h-3 opacity-70" /></button>
                                  <button onClick={(e) => { e.stopPropagation(); deleteCategory(subCat.id); }} className="p-1 rounded-md hover:text-red-500 hover:bg-black/10 dark:hover:bg-white/20"><Trash2 className="w-3 h-3 opacity-70" /></button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                       )
                    })}
                  </div>
                </div>
              )})}
            </div>
          </div>
        </aside>

        {/* Main Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10 max-w-5xl mx-auto">
            
            {activeTab === 'templates' && (
              <>
                <section className="mb-12 max-w-2xl">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
                  >
                    {t.heroTitle1} <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      {t.heroTitle2}
                    </span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`text-base md:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                  >
                    {t.heroSubtitle}
                  </motion.p>
                </section>

                {activeCategory && (
                  <motion.div 
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl p-6 md:p-8 backdrop-blur-xl border ${
                      isDark ? 'bg-slate-900/40 border-white/10 shadow-2xl shadow-black/50' : 'bg-white/80 border-slate-200 shadow-xl shadow-black/5'
                    }`}
                  >
                    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 pb-6 border-b border-opacity-10 border-slate-500 gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                           {activeCategory.color && <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[activeCategory.color]?.bg || 'bg-slate-500'}`} />}
                           <h2 className="text-xl md:text-2xl font-bold">{activeCategory.name}</h2>
                        </div>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {activeCategory.templates?.length || 0} {t.templatesAvailable}
                        </p>
                      </div>
                      {isAdmin && (
                        <div className="flex gap-3 self-start sm:self-auto">
                          <button 
                            onClick={() => setIsAIModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium whitespace-nowrap">{t.generateAI}</span>
                          </button>
                          <button 
                            onClick={() => handleAddTemplate(activeCategory.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium whitespace-nowrap">{t.addSnippet}</span>
                          </button>
                        </div>
                      )}
                    </header>

                    <div className="flex flex-col gap-4">
                      {isAdmin ? (
                        <Reorder.Group 
                          axis="y" 
                          values={activeCategory.templates || []} 
                          onReorder={(newOrder) => handleReorder(activeCategory.id, newOrder)}
                          className="flex flex-col gap-4"
                        >
                          <AnimatePresence>
                            {activeCategory.templates?.map((template) => (
                              <TemplateCard 
                                key={template.id}
                                template={template} 
                                categoryId={activeCategory.id}
                                isDark={isDark}
                                isAdmin={isAdmin}
                                onUpdate={updateTemplate}
                                onDelete={deleteTemplate}
                                t={t}
                              />
                            ))}
                          </AnimatePresence>
                        </Reorder.Group>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {activeCategory.templates?.map((template) => (
                            <TemplateCard 
                              key={template.id}
                              template={template} 
                              categoryId={activeCategory.id}
                              isDark={isDark}
                              isAdmin={isAdmin}
                              onUpdate={updateTemplate}
                              onDelete={deleteTemplate}
                              t={t}
                            />
                          ))}
                        </div>
                      )}
                      
                      {(!activeCategory.templates || activeCategory.templates.length === 0) && (
                        <div className={`col-span-full py-12 text-center rounded-2xl border-2 border-dashed ${isDark ? 'border-white/10 text-white/30' : 'border-slate-300 text-slate-400'}`}>
                            <p>{t.noTemplates}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {activeTab === 'guides' && activeGuideCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-opacity-10 border-slate-500">
                   <div>
                      <div className="flex items-center gap-3">
                         {activeGuideCategory.color && <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[activeGuideCategory.color]?.bg || 'bg-purple-500'}`} />}
                         <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{activeGuideCategory.name}</h2>
                      </div>
                      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {activeGuideCategory.guides?.length || 0} {t.guidesAvailable}
                      </p>
                   </div>
                   {isAdmin && (
                     <button 
                        onClick={() => handleAddGuide(activeGuideCategory.id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.addGuide}</span>
                      </button>
                   )}
                </div>

                <div className="flex flex-col gap-8">
                   <AnimatePresence>
                     {activeGuideCategory.guides?.map(guide => {
                        const driveId = extractDriveId(guide.url);
                        const isExpanded = expandedGuides[guide.id];
                        return (
                        <motion.div 
                          key={guide.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`rounded-3xl border overflow-hidden shadow-2xl transition-all flex flex-col ${isExpanded ? '' : 'xl:flex-row'} ${isDark ? 'bg-slate-900/60 border-white/15' : 'bg-white border-slate-200'}`}
                        >
                           {/* Video Section - Massively Increased Scale & Fullscreen button */}
                           <div className={`w-full ${isExpanded ? '' : 'xl:w-2/3'} border-b ${isExpanded ? '' : 'xl:border-b-0 xl:border-r'} flex flex-col transition-all duration-300 ${isDark ? 'border-white/10 bg-black/60' : 'border-slate-200 bg-slate-900'}`}>
                              <div className="p-3 flex items-center justify-between gap-3 bg-black/40">
                                 {isAdmin && (
                                   <div className="flex items-center gap-2 flex-1">
                                      <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-800 text-white'}`}>
                                         <Link2 className="w-4 h-4 opacity-70" />
                                      </div>
                                      <input 
                                         type="text" 
                                         value={guide.url}
                                         onChange={(e) => updateGuide(activeGuideCategory.id, guide.id, { url: e.target.value })}
                                         placeholder={t.driveUrlPlaceholder}
                                         className={`flex-1 bg-transparent border-none outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-white placeholder-slate-400'}`}
                                      />
                                   </div>
                                 )}
                                 <div className="flex items-center gap-1 ml-auto">
                                    {driveId && (
                                      <button
                                         onClick={() => setFullscreenVideoUrl(guide.url)}
                                         className={`p-2 rounded-lg transition-colors text-white bg-white/10 hover:bg-white/20`}
                                         title="Open Fullscreen Player"
                                      >
                                         <Expand className="w-4 h-4" />
                                      </button>
                                    )}
                                    {isAdmin && (
                                      <button
                                         onClick={() => toggleGuideExpand(guide.id)}
                                         className={`p-2 rounded-lg transition-colors text-white bg-white/10 hover:bg-white/20`}
                                         title={isExpanded ? "Collapse Layout" : "Expand Video"}
                                      >
                                         {isExpanded ? <Shrink className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                      </button>
                                    )}
                                 </div>
                              </div>
                              <div className="relative w-full min-h-[460px] md:min-h-[600px] bg-black flex items-center justify-center">
                                 {driveId ? (
                                    <iframe 
                                      src={`https://drive.google.com/file/d/${driveId}/preview?usp=sharing&vq=hd1080&autoplay=1&volume=50`} 
                                      width="100%" 
                                      height="100%" 
                                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                      allowFullScreen={true}
                                      webkitallowfullscreen="true"
                                      mozallowfullscreen="true"
                                      className="absolute inset-0 w-full h-full border-0"
                                      title="Google Drive Video"
                                    ></iframe>
                                 ) : (
                                    <div className="flex flex-col items-center text-slate-500 gap-3 opacity-60">
                                       <Video className="w-12 h-12" />
                                       <p className="text-sm font-medium">Video Player</p>
                                    </div>
                                 )}
                              </div>
                              <div className={`p-3 text-xs flex items-center gap-2 ${isDark ? 'bg-black/80 text-amber-400/80' : 'bg-slate-950 text-amber-400'}`}>
                                 <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                 {t.publicLinkWarning}
                              </div>
                           </div>

                           {/* Details Section */}
                           <div className={`w-full ${isExpanded ? '' : 'xl:w-1/3'} p-6 flex flex-col gap-4 transition-all duration-300`}>
                              <div className="flex items-start justify-between gap-4">
                                 <input 
                                    type="text"
                                    value={guide.title}
                                    onChange={(e) => updateGuide(activeGuideCategory.id, guide.id, { title: e.target.value })}
                                    readOnly={!isAdmin}
                                    placeholder={t.guideTitlePlaceholder}
                                    className={`w-full text-lg font-bold bg-transparent border-none outline-none ${isDark ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'}`}
                                 />
                                 {isAdmin && (
                                   <button onClick={() => deleteGuide(activeGuideCategory.id, guide.id)} className={`p-2 rounded-lg transition-colors shrink-0 ${isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-500'}`} title="Delete Guide">
                                      <Trash2 className="w-5 h-5" />
                                   </button>
                                 )}
                              </div>
                              
                              <textarea 
                                 value={guide.description} 
                                 onChange={(e) => updateGuide(activeGuideCategory.id, guide.id, { description: e.target.value })} 
                                 readOnly={!isAdmin}
                                 placeholder={t.guideDescPlaceholder} 
                                 className={`w-full flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed min-h-[220px] p-4 rounded-xl border ${isDark ? 'text-slate-200 placeholder-slate-600 border-white/5 bg-white/5' : 'text-slate-800 placeholder-slate-400 border-slate-200 bg-slate-50'}`} 
                              />
                           </div>
                        </motion.div>
                     )})}
                   </AnimatePresence>
                   
                   {(!activeGuideCategory.guides || activeGuideCategory.guides.length === 0) && (
                      <div className={`col-span-full py-20 text-center rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 ${isDark ? 'border-white/10 text-slate-500' : 'border-slate-300 text-slate-400'}`}>
                         <div className="w-16 h-16 rounded-2xl bg-slate-500/10 flex items-center justify-center mb-2">
                           <BookOpen className="w-8 h-8 opacity-50" />
                         </div>
                         <p className="text-lg">{t.noGuides}</p>
                      </div>
                   )}
                </div>
              </motion.div>
            )}

            {activeTab === 'examples' && activeExampleCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-opacity-10 border-slate-500">
                   <div>
                      <div className="flex items-center gap-3">
                         {activeExampleCategory.color && <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[activeExampleCategory.color]?.bg || 'bg-blue-500'}`} />}
                         <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{activeExampleCategory.name}</h2>
                      </div>
                      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {activeExampleCategory.examples?.length || 0} {t.examplesAvailable}
                      </p>
                   </div>
                   {isAdmin && (
                     <>
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(activeExampleCategory.id, e)} />
                       <button 
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingIds.size > 0}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploadingIds.size > 0 ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm font-medium">{t.uploading}</span>
                            </>
                          ) : (
                            <>
                              <ImagePlus className="w-4 h-4" />
                              <span className="text-sm font-medium">{t.addPhoto}</span>
                            </>
                          )}
                        </button>
                     </>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <AnimatePresence>
                     {activeExampleCategory.examples?.map(ex => (
                        <motion.div 
                          key={ex.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`rounded-2xl border overflow-hidden flex flex-col shadow-sm transition-all ${isDark ? 'bg-slate-900/50 border-white/10 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-400'}`}
                        >
                           <div 
                              className="relative aspect-square sm:aspect-video bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden group cursor-pointer"
                              onClick={() => setFullscreenImage(ex.image)}
                           >
                              <img src={ex.image} alt="Example" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              {ex.isCloud && (
                                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-emerald-500/80 text-white">
                                  <Cloud className="w-3 h-3" />
                                </div>
                              )}
                           </div>
                           <div className="p-4 flex-1 flex flex-col gap-3">
                              <textarea 
                                value={ex.description} 
                                onChange={(e) => updateExample(activeExampleCategory.id, ex.id, e.target.value)} 
                                readOnly={!isAdmin}
                                placeholder={t.descriptionPlaceholder} 
                                className={`w-full flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed min-h-[100px] ${isDark ? 'text-slate-200 placeholder-slate-600' : 'text-slate-800 placeholder-slate-400'}`} 
                              />
                              {isAdmin && (
                                <div className="flex justify-end pt-3 border-t border-slate-500/20">
                                   <button onClick={() => deleteExample(activeExampleCategory.id, ex.id)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-500'}`} title="Delete example">
                                      <Trash2 className="w-4 h-4" />
                                   </button>
                                </div>
                              )}
                           </div>
                        </motion.div>
                     ))}
                   </AnimatePresence>
                   
                   {(!activeExampleCategory.examples || activeExampleCategory.examples.length === 0) && (
                      <div className={`col-span-full py-20 text-center rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 ${isDark ? 'border-white/10 text-slate-500' : 'border-slate-300 text-slate-400'}`}>
                         <div className="w-16 h-16 rounded-2xl bg-slate-500/10 flex items-center justify-center mb-2">
                           <ImageIcon className="w-8 h-8 opacity-50" />
                         </div>
                         <p className="text-lg">{t.noExamples}</p>
                      </div>
                   )}
                </div>
              </motion.div>
            )}

          </div>
        </main>
      </div>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-sm p-6 rounded-3xl border shadow-2xl ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  {t.adminModalTitle}
                </h3>
                <button 
                  onClick={() => { setIsAdminModalOpen(false); setLoginError(false); setAdminPasswordInput(''); }}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t.adminPasswordLabel}
                  </label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => { setAdminPasswordInput(e.target.value); setLoginError(false); }}
                    placeholder={t.adminPasswordPlaceholder}
                    autoFocus
                    className={`w-full p-3 rounded-xl outline-none border transition-colors ${
                      isDark 
                        ? 'bg-slate-950/50 border-white/10 focus:border-purple-500 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 focus:border-purple-400 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  {loginError && (
                    <p className="text-xs text-red-500 mt-2">{t.wrongPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
                >
                  {t.loginBtn}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {fullscreenVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenVideoUrl(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-2 sm:p-6 cursor-pointer backdrop-blur-md"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenVideoUrl(null);
              }}
              className="absolute top-4 right-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[80]"
            >
              <X className="w-6 h-6" />
            </button>
            <div 
              className="relative w-full max-w-7xl h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {extractDriveId(fullscreenVideoUrl) ? (
                <iframe 
                  src={`https://drive.google.com/file/d/${extractDriveId(fullscreenVideoUrl)}/preview?usp=sharing&vq=hd1080&autoplay=1&volume=50`} 
                  width="100%" 
                  height="100%" 
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen={true}
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  className="absolute inset-0 w-full h-full border-0"
                  title="Google Drive Video Fullscreen"
                ></iframe>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-sm"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-[70]"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={fullscreenImage}
              alt="Fullscreen Example"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Modal */}
      <AnimatePresence>
        {isAIModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  {t.aiModalTitle}
                </h3>
                <button 
                  onClick={() => setIsAIModalOpen(false)}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.aiModalLabel}
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`${t.aiModalPlaceholder} (Context: ${activeCategory?.name})`}
                  className={`w-full p-4 rounded-xl resize-none outline-none border transition-colors h-32 ${
                    isDark 
                      ? 'bg-slate-950/50 border-white/10 focus:border-purple-500 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 focus:border-purple-400 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="flex justify-end mb-6">
                <button
                  onClick={generateAITemplate}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? t.generating : t.generateBtn}
                </button>
              </div>

              {aiResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-4 rounded-xl border overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                >
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.generatedOptions}
                  </h4>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {aiResult.split('---').map((option, idx) => {
                      const text = option.trim();
                      if (!text) return null;
                      return (
                        <div key={idx} className={`p-3 rounded-lg flex flex-col gap-3 ${isDark ? 'bg-slate-950/50' : 'bg-white border border-slate-200'}`}>
                          <p className="text-sm whitespace-pre-wrap">{text}</p>
                          <button
                            onClick={() => saveAiResult(text)}
                            className={`self-end flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            <Plus className="w-3 h-3" /> {t.saveToCategory}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TemplateCard = React.forwardRef(({ template, categoryId, isDark, isAdmin, onUpdate, onDelete, t }, ref) => {
  const [copied, setCopied] = useState(false);
  const [showNote, setShowNote] = useState(!!template.note);
  const textareaRef = useRef(null);
  const noteRef = useRef(null);
  const dragControls = useDragControls();

  const handleCopy = () => {
    navigator.clipboard.writeText(template.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [template.text]);

  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.style.height = 'auto';
      noteRef.current.style.height = noteRef.current.scrollHeight + 'px';
    }
  }, [template.note, showNote]);

  const cardContent = (
    <div
      className={`group relative flex flex-col p-5 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-slate-900/50 border-white/10 hover:border-purple-500/50' 
          : 'bg-white border-slate-200 hover:border-purple-400 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {isAdmin && (
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing p-1 -ml-2 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" 
            style={{ touchAction: 'none' }}
            title="Drag to reorder"
          >
             <GripVertical className="w-4 h-4" />
          </div>
        )}
        
        {template.attachmentType === 'teaser' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <ImageIcon className="w-3 h-3" />
            {t.teaser}
          </div>
        )}
        {template.attachmentType === 'ppv' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-pink-500/20 text-pink-400 border border-pink-500/30">
            <Lock className="w-3 h-3" />
            {t.ppv}
          </div>
        )}

        {isAdmin && (
          <>
            <button
              onClick={() => onUpdate(categoryId, template.id, { attachmentType: template.attachmentType === 'teaser' ? null : 'teaser' })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all ${
                template.attachmentType === 'teaser'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : isDark ? 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
              }`}
              title="Toggle Teaser Photo requirement"
            >
              <ImageIcon className="w-3 h-3" />
              {t.teaser}
            </button>
            <button
              onClick={() => onUpdate(categoryId, template.id, { attachmentType: template.attachmentType === 'ppv' ? null : 'ppv' })}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all ${
                template.attachmentType === 'ppv'
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  : isDark ? 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
              }`}
              title="Toggle PPV/Sale requirement"
            >
              <Lock className="w-3 h-3" />
              {t.ppv}
            </button>
          </>
        )}

        {(showNote || template.note || isAdmin) && (
          <button
            onClick={() => setShowNote(!showNote)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all ml-auto ${
              showNote || template.note
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                : isDark ? 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            }`}
            title="Toggle Notes"
          >
            <StickyNote className="w-3 h-3" />
            {t.addNote}
          </button>
        )}
      </div>

      <textarea
        ref={textareaRef}
        value={template.text}
        onChange={(e) => onUpdate(categoryId, template.id, { text: e.target.value })}
        readOnly={!isAdmin}
        placeholder={t.typeTemplateHere}
        className={`w-full resize-none bg-transparent outline-none text-sm leading-relaxed min-h-[80px] overflow-hidden ${
          isDark ? 'text-slate-200 placeholder-slate-600' : 'text-slate-800 placeholder-slate-400'
        }`}
      />

      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={`mt-3 p-3 rounded-xl border ${isDark ? 'bg-amber-900/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
              <textarea
                ref={noteRef}
                value={template.note || ''}
                onChange={(e) => onUpdate(categoryId, template.id, { note: e.target.value })}
                readOnly={!isAdmin}
                placeholder={t.notePlaceholder}
                className={`w-full bg-transparent resize-none outline-none text-sm italic font-serif leading-relaxed min-h-[40px] ${
                  isDark ? 'text-amber-200/80 placeholder-amber-500/40' : 'text-amber-900/80 placeholder-amber-700/40'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 flex justify-between items-center pt-4 border-t border-opacity-50 border-slate-500/20">
        {isAdmin ? (
          <button
            onClick={() => onDelete(categoryId, template.id)}
            className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${
              isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-500'
            }`}
            title="Delete template"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : <div />}

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
            copied 
              ? 'bg-green-500/20 text-green-500' 
              : isDark 
                ? 'bg-white/5 hover:bg-white/10 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </div>
  );

  if (isAdmin) {
    return (
      <Reorder.Item
        ref={ref}
        value={template}
        id={template.id}
        dragListener={false}
        dragControls={dragControls}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      >
        {cardContent}
      </Reorder.Item>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {cardContent}
    </motion.div>
  );
});
