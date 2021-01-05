!! https://feature-u.js.org/1.0.1/ !!

В идеале:

1. Весь код модуля располагается в одной папке. Чтобы полностью удалить модуль из программы достаточно удалить соответствующую папку. Удаление модуля не нарушает работоспособности других модулей, но лишает приложение части функциональности.

2. Модули не зависимы друг от друга. Модификация любого модуля не влияет на работу других модулей. Допускается зависимость модулей от «ядра» системы.

3. Ядро системы содержит публичное API, предоставляющее модулям средства ввода/вывода и набор компонентов для создания UI.

https://www.pvsm.ru/javascript/252703

---

https://mobx.js.org/defining-data-stores.html

Things you will typically find in UI stores:

Session information
Information about how far your application has loaded
Information that will not be stored in the backend
Information that affects the UI globally
Window dimensions
Accessibility information
Current language
Currently active theme
User interface state as soon as it affects multiple, further unrelated components:
Current selection
Visibility of toolbars, etc.
State of a wizard
State of a global overlay
