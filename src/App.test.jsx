import { render, screen, fireEvent } from '@testing-library/react' // імпорт функцій для рендерингу компонентів та взаємодії з DOM
import App from './App' // імпорт компонента App, який будемо тестувати

describe('Компонент App', () => { // група тестів для компонента App

    it('відображає логотипи React і Vite в hero-секції', () => { // тест: перевіряє наявність логотипів у верхній частині сторінки
        render(<App />) // рендеримо компонент App
        expect(screen.getByAltText('React logo')).toBeInTheDocument() // очікуємо, що зображення з alt "React logo" присутнє в документі
        expect(screen.getByAltText('Vite logo')).toBeInTheDocument() // очікуємо, що зображення з alt "Vite logo" присутнє в документі
    })

    it('відображає заголовок "Get started"', () => { // тест: перевіряє відображення головного заголовка
        render(<App />) // рендеримо компонент App
        expect(screen.getByRole('heading', { level: 1, name: /Get started/i })).toBeInTheDocument() // очікуємо, що заголовок першого рівня з текстом "Get started" присутній
    })

    it('відображає підказку про редагування App.jsx та HMR', () => { // тест: перевіряє наявність тексту-підказки з кодовими елементами
        render(<App />) // рендеримо компонент App
        expect(screen.getByText('src/App.jsx')).toBeInTheDocument() // очікуємо, що присутній код "src/App.jsx"
        expect(screen.getByText('HMR')).toBeInTheDocument() // очікуємо, що присутній код "HMR"
    })

    it('відображає початкове значення лічильника', () => { // тест: перевіряє початковий стан кнопки-лічильника
        render(<App />) // рендеримо компонент App
        expect(screen.getByRole('button', { name: /Count is 0/i })).toBeInTheDocument() // очікуємо, що кнопка зі значенням "Count is 0" відображається
    })

    it('збільшує значення лічильника при кліку', () => { // тест: перевіряє інкремент лічильника при кліках
        render(<App />) // рендеримо компонент App
        const button = screen.getByRole('button', { name: /Count is 0/i }) // отримуємо кнопку-лічильник
        fireEvent.click(button) // симулюємо перший клік
        expect(button).toHaveTextContent('Count is 1') // очікуємо, що текст кнопки змінився на "Count is 1"
        fireEvent.click(button) // симулюємо другий клік
        expect(button).toHaveTextContent('Count is 2') // очікуємо, що текст кнопки змінився на "Count is 2"
    })

    it('відображає заголовки розділів Documentation та Connect with us', () => { // тест: перевіряє заголовки другого рівня в нижніх секціях
        render(<App />) // рендеримо компонент App
        expect(screen.getByRole('heading', { level: 2, name: /Documentation/i })).toBeInTheDocument() // очікуємо заголовок "Documentation"
        expect(screen.getByRole('heading', { level: 2, name: /Connect with us/i })).toBeInTheDocument() // очікуємо заголовок "Connect with us"
    })

    it('відображає посилання розділу Documentation з правильними адресами', () => { // тест: перевіряє посилання "Explore Vite" та "Learn more"
        render(<App />) // рендеримо компонент App
        expect(screen.getByRole('link', { name: /Explore Vite/i })).toHaveAttribute('href', 'https://vite.dev/') // посилання "Explore Vite" веде на сайт Vite
        expect(screen.getByRole('link', { name: /Learn more/i })).toHaveAttribute('href', 'https://react.dev/') // посилання "Learn more" веде на сайт React
    })

    it('відображає посилання розділу Connect with us з правильними адресами', () => { // тест: перевіряє посилання на соціальні мережі та спільноти
        render(<App />) // рендеримо компонент App
        expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/vitejs/vite') // посилання "GitHub" веде на репозиторій Vite
        expect(screen.getByRole('link', { name: /Discord/i })).toHaveAttribute('href', 'https://chat.vite.dev/') // посилання "Discord" веде на чат спільноти
        expect(screen.getByRole('link', { name: /X.com/i })).toHaveAttribute('href', 'https://x.com/vite_js') // посилання "X.com" веде на профіль в X
        expect(screen.getByRole('link', { name: /Bluesky/i })).toHaveAttribute('href', 'https://bsky.app/profile/vite.dev') // посилання "Bluesky" веде на профіль в Bluesky
    })

    it('всі зовнішні посилання відкриваються у новій вкладці', () => { // тест: перевіряє атрибут target="_blank" на всіх зовнішніх посиланнях
        render(<App />) // рендеримо компонент App
        const links = screen.getAllByRole('link') // отримуємо всі посилання на сторінці
        links.forEach((link) => { // перебираємо кожне посилання
            expect(link).toHaveAttribute('target', '_blank') // очікуємо, що атрибут target дорівнює "_blank"
        })
    })
})