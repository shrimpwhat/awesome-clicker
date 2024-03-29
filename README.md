# Awesome Clicker
[https://awesome-clicker.vercel.app/](https://awesome-clicker.vercel.app/)
![preview](https://github.com/shrimpwhat/awesome-clicker/assets/49585211/6a2d9744-b522-45a0-8983-f7cb68706ec5)

Данное приложение ориентировано на пользовательский интерфейс, поэтому в нем реализованы различные анимации, цветовые темы(светлая и темная) и градиенты, а также был использован 3D-рендеринг.

## Описание

Каждое нажатие на кнопку _Click_ сопровождается анимацией взрыва из 3D-частиц на заднем плане. В специальной *огненной* теме, активируемой после 100 последовательных нажатий, при каждом клике появляется иконка огня, плывущего к верху экрана. После некоторого периода бездействия *огненная* тема автоматически переключается на предыдущую тему. Текущая комбинация кликов отображается в индикаторе прогресса внизу экрана. Если пользователь перестает нажимать на кнопку, в правом нижнем углу появляется полоса, обохначающая оставшееся время, по истечении которого текущее комбо сбрасывается.

## Технологии
- Typescript
- React
- Vite
- [Zustand](https://github.com/pmndrs/zustand) (state-manager)
- SASS
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (React рендерер для three.js)

## Запуск
1. `npm install`
2. `npm run dev`
### Тесты
`npm run test`
