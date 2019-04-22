function onClickParentMode(e, aEl, aEls, bodyEls) {
    e.preventDefault();
    e.stopPropagation();

    aEls.forEach(aEl => delete aEl.parentNode.dataset.active);
    aEl.parentNode.dataset.active = `${true}`;

    const { index } = aEl.parentNode.dataset;
    bodyEls.forEach(bodyEl => {
        if(bodyEl.dataset.index === index) {
            bodyEl.dataset.active = `${true}`;
        } else {
            delete bodyEl.dataset.active;
        }
    });
}
function onClick(e, aEl, aEls, bodyEls) {
    e.preventDefault();
    e.stopPropagation();

    aEls.forEach(aEl => delete aEl.dataset.active);
    aEl.dataset.active = `${true}`;

    const { index } = aEl.dataset;
    bodyEls.forEach(bodyEl => {
        if(bodyEl.dataset.index === index) {
            bodyEl.dataset.active = `${true}`;
        } else {
            delete bodyEl.dataset.active;
        }
    });
}

export function tabAction(container, options = {}) {
    const containerEl = document.querySelector(container);
    const { headParent } = options;
    const { tabHeadEl, tabBodyEl } = {
        tabHeadEl: containerEl.querySelector(`[role="tab-head"]`),
        tabBodyEl: containerEl.querySelector(`[role="tab-body"]`)
    };

    const aEls = tabHeadEl.querySelectorAll(`a[href="#"]`);
    const bodyEls = tabBodyEl.querySelectorAll(`[data-index]`);
    aEls.forEach(aEl => {
        aEl.addEventListener(`click`, (e) => {
            if(headParent) onClickParentMode(e, aEl, aEls, bodyEls);
            else onClick(e, aEl, aEls, bodyEls);
        });
    });
}
export function bindNextPrevTabButton(container, prevButton, nextButton) {
    const containerEl = document.querySelector(container);
    const tabHeadEl = containerEl.querySelector(`[role="tab-head"]`);

    const prevButtonEl = document.querySelector(prevButton);
    const nextButtonEl = document.querySelector(nextButton);

    prevButtonEl.addEventListener(`click`, function(e) {
        e.preventDefault();
        e.stopPropagation();

        const activeEl = tabHeadEl.querySelector(`a[data-active="true"]`);
        if(activeEl.parentNode.previousSibling === null) return;
        if(activeEl.parentNode.previousSibling.previousSibling === null) return;
        activeEl.parentNode.previousSibling.previousSibling.querySelector(`a`).click();
    });
    nextButtonEl.addEventListener(`click`, function(e) {
        e.preventDefault();
        e.stopPropagation();

        const activeEl = tabHeadEl.querySelector(`a[data-active="true"]`);
        if(activeEl.parentNode.nextSibling === null) return;
        if(activeEl.parentNode.nextSibling.nextSibling === null) return;
        activeEl.parentNode.nextSibling.nextSibling.querySelector(`a`).click();
    });
}