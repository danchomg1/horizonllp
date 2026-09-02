import event from './event'
import page from './page'
import home from './home' // <--- Добавили
import footer from './footer' // <--- Добавили
import courseCategory from './courseCategory'
import consultingItem from './consultingItem'
import explosionItem from './explosionItem'
import emergencyItem from './emergencyItem'
import engineeringItem from './engineeringItem'
import ppeItem from './ppeItem'
import tabItem from './tabItem'
import richText from './richText'
import header from './header'
import news from './news'
import tabs from './tabs'
import course from './course'
import contactCity from './contactCity'
import aboutItem from './aboutItem'

// Справочники для сертификатов
import certCourse from './certCourse'
import certInstructor from './certInstructor'
import certCountry from './certCountry'
import certCity from './certCity'
import certCompletion from './certCompletion'
import certSettings from './certSettings'


export const schemaTypes = [aboutItem, contactCity, course, tabs, header,news, richText, tabItem, event, page, home, footer, courseCategory, consultingItem,
    explosionItem, emergencyItem, engineeringItem, ppeItem,
    certCourse, certInstructor, certCountry, certCity, certCompletion, certSettings] // <--- Добавили в список