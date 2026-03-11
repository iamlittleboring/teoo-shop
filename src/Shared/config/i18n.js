import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGE_STORAGE_KEY = "teoo-shop-language";
const supportedLanguages = ["uk", "en"];

const storedLanguage =
    typeof window !== "undefined"
        ? window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
        : null;
const browserLanguage =
    typeof navigator !== "undefined" ? navigator.language?.slice(0, 2) : "uk";
const initialLanguage = supportedLanguages.includes(storedLanguage)
    ? storedLanguage
    : supportedLanguages.includes(browserLanguage)
      ? browserLanguage
      : "uk";

const resources = {
    uk: {
        translation: {
            common: {
                loading: "Завантаження...",
                loadingProducts: "Завантаження товарів...",
                loadingProduct: "Завантаження товару...",
                loadingSearch: "Завантаження пошуку...",
                search: "Пошук",
                currency: "грн",
                instagram: "Instagram",
                account: "Акаунт",
                menu: "Меню",
            },
            header: {
                menu: {
                    new: "новинки",
                    tshirts: "футболки",
                    hoodies: "худі",
                },
                actions: {
                    toggleTheme: "Змінити тему",
                    instagram: "Instagram",
                    openFavorites: "Відкрити вподобані",
                    openCart: "Відкрити кошик",
                    account: "Акаунт",
                },
            },
            footer: {
                copyright: "© Teoo shop 2024",
                langUa: "Українська",
                langEn: "Англійська",
            },
            cart: {
                title: "Кошик",
                empty: "Кошик порожній.",
                total: "Разом:",
                clear: "Очистити кошик",
                removeItem: "Видалити товар",
                addItem: "Додати в кошик",
                increase: "Збільшити кількість",
                decrease: "Зменшити кількість",
                size: "Розмір: {{size}}",
                color: "Колір:",
            },
            favorites: {
                title: "Вподобані",
                empty: "У вас поки немає вподобаних.",
                remove: "Видалити",
                clear: "Очистити вподобані",
                add: "Додати у вподобані",
                open: "Відкрити вподобані",
                removeItem: "Прибрати з вподобаних",
            },
            account: {
                title: "Акаунт",
                empty: "Тут скоро з'явиться вміст акаунта.",
            },
            searchPage: {
                title: "Пошук",
                resultCount: "{{count}} результатів",
                resultCountFor: "{{count}} результатів для \"{{query}}\"",
                sortAria: "Сортувати товари",
                sortRelevance: "Сортування: За релевантністю",
                sortPriceAsc: "Ціна: Від дешевих",
                sortPriceDesc: "Ціна: Від дорогих",
                sortName: "Назва: A-Z",
                empty: "Товари за вашими фільтрами не знайдено.",
                category: "Категорія",
                priceRange: "Діапазон цін",
                min: "Мін",
                max: "Макс",
                reset: "Скинути фільтри",
                categories: {
                    tshirts: "Футболки",
                    hoodies: "Худі",
                    accessories: "Аксесуари",
                },
            },
            searchInput: {
                open: "Відкрити пошук",
                products: "Пошук товарів",
                placeholder: "Пошук",
            },
            home: {
                categories: {
                    tshirts: {
                        title: "Футболки",
                        subtitle: "Щоденні базові речі",
                    },
                    hoodies: {
                        title: "Худі",
                        subtitle: "Вуличний шар",
                    },
                    accessories: {
                        title: "Аксесуари",
                        subtitle: "Фінальний штрих",
                    },
                },
            },
            product: {
                notFound: "Товар не знайдено",
                failedLoad: "Не вдалося завантажити товар",
            },
            productTypes: {
                tshirt: "футболка",
                hoodie: "худі",
                accessory: "аксесуар",
            },
            collection: {
                notFound: "Колекцію не знайдено",
            },
        },
    },
    en: {
        translation: {
            common: {
                loading: "Loading...",
                loadingProducts: "Loading products...",
                loadingProduct: "Loading product...",
                loadingSearch: "Loading search...",
                search: "Search",
                currency: "uah",
                instagram: "Instagram",
                account: "Account",
                menu: "Menu",
            },
            header: {
                menu: {
                    new: "new",
                    tshirts: "t-shirts",
                    hoodies: "hoodies",
                },
                actions: {
                    toggleTheme: "Toggle theme",
                    instagram: "Instagram",
                    openFavorites: "Open favorites",
                    openCart: "Open cart",
                    account: "Account",
                },
            },
            footer: {
                copyright: "© Teoo shop 2024",
                langUa: "Ukrainian",
                langEn: "English",
            },
            cart: {
                title: "Cart",
                empty: "Your cart is empty.",
                total: "Total:",
                clear: "Clear cart",
                removeItem: "Remove item",
                addItem: "Add to cart",
                increase: "Increase quantity",
                decrease: "Decrease quantity",
                size: "Size: {{size}}",
                color: "Color:",
            },
            favorites: {
                title: "Favorites",
                empty: "You have no favorites yet.",
                remove: "Remove",
                clear: "Clear favorites",
                add: "Add to favorites",
                open: "Open favorites",
                removeItem: "Remove from favorites",
            },
            account: {
                title: "Account",
                empty: "Account content will appear here soon.",
            },
            searchPage: {
                title: "Search",
                resultCount: "{{count}} results",
                resultCountFor: "{{count}} results for \"{{query}}\"",
                sortAria: "Sort products",
                sortRelevance: "Sort: Relevance",
                sortPriceAsc: "Price: Low to high",
                sortPriceDesc: "Price: High to low",
                sortName: "Name: A-Z",
                empty: "No products match your filters.",
                category: "Category",
                priceRange: "Price range",
                min: "Min",
                max: "Max",
                reset: "Reset filters",
                categories: {
                    tshirts: "T-Shirts",
                    hoodies: "Hoodies",
                    accessories: "Accessories",
                },
            },
            searchInput: {
                open: "Open search",
                products: "Search products",
                placeholder: "Search",
            },
            home: {
                categories: {
                    tshirts: {
                        title: "T-Shirts",
                        subtitle: "Daily essentials",
                    },
                    hoodies: {
                        title: "Hoodies",
                        subtitle: "Street layer",
                    },
                    accessories: {
                        title: "Accessories",
                        subtitle: "Final touch",
                    },
                },
            },
            product: {
                notFound: "Product not found",
                failedLoad: "Failed to load product",
            },
            productTypes: {
                tshirt: "t-shirt",
                hoodie: "hoodie",
                accessory: "accessory",
            },
            collection: {
                notFound: "Collection not found",
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: "uk",
    interpolation: {
        escapeValue: false,
    },
});

i18n.on("languageChanged", (language) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
    if (typeof document !== "undefined") {
        document.documentElement.lang = language;
    }
});

if (typeof document !== "undefined") {
    document.documentElement.lang = i18n.language;
}

export default i18n;
