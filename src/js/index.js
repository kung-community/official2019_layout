import "./../scss/bundle.scss";

import { tabAction, bindNextPrevTabButton } from "./components/tab.component";

document.addEventListener(`DOMContentLoaded`, function() {
    tabAction(`#main-tab`);
    bindNextPrevTabButton(`#main-tab`, `#main-tab-prev`, `#main-tab-next`);
    tabAction(`#section-tab`, { headParent: true });
    tabAction(`#best-tab`, { headParent: true });
});