var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _FoodItem_instances, getImgSrcAlt_fn, createFoodItem_fn, _body;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function IconButton({ imgSrc, label, onClick = () => {
} }) {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" class="gnb__button" aria-label="${label}">
    <img src="${imgSrc}" alt="${label}" /></button
  >
  `;
  container.querySelector("button").addEventListener("click", () => {
    onClick();
  });
  return container.firstElementChild;
}
const CAPTION = {
  description: "메뉴 등 추가 정보를 입력해 주세요",
  link: "매장 정보를 확인할 수 있는 링크를 입력해 주세요"
};
function setError(name) {
  document.querySelector(`[name=${name}]`).classList.add("error");
}
function removeError(name) {
  document.querySelector(`[name=${name}]`).classList.remove("error");
}
function resetError() {
  ["category", "name", "distance", "description", "link"].forEach((key) => {
    return removeError(key);
  });
}
const NAME_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 200;
const Alert = ({ message }) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("text-body");
  alert.innerText = message;
  return alert;
};
function alertError(error) {
  if (!document.querySelector(".alert")) {
    document.querySelector("body").appendChild(Alert({ message: error }));
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }
}
const ERROR_MESSAGE = {
  required: "필수 입력 항목이 비어있습니다.",
  length: (length) => `최대 ${length}자까지 입력할 수 있습니다.`,
  url: "올바르지 않는 URL입니다. (http(s)~ 로 시작하는 URL을 입력해주세요.)"
};
class InputGuide {
  constructor(name, message) {
    __publicField(this, "error");
    setError(name);
    this.error = new Error(message);
    throw this.error;
  }
  static category(input) {
    const inputId = "category";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    removeError(inputId);
  }
  static name(input, maxLength) {
    const inputId = "name";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    if (input.length > maxLength) {
      return new InputGuide(inputId, ERROR_MESSAGE.length(maxLength));
    }
    removeError(inputId);
  }
  static distance(input, maxLength) {
    const inputId = "distance";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    if (input.length > maxLength) {
      return new InputGuide(inputId, ERROR_MESSAGE.length(maxLength));
    }
    removeError(inputId);
  }
  static description(input) {
    const inputId = "description";
    removeError(inputId);
  }
  static link(input) {
    const inputId = "link";
    if (!input) return;
    try {
      new URL(input);
    } catch (error) {
      return new InputGuide(inputId, ERROR_MESSAGE.url);
    }
    removeError(inputId);
  }
}
function validateFoodItem({
  category,
  name,
  distance,
  description,
  link
}) {
  resetError();
  try {
    InputGuide.category(category);
    InputGuide.name(name, NAME_MAX_LENGTH);
    InputGuide.distance(distance);
    InputGuide.description(description, DESCRIPTION_MAX_LENGTH);
    InputGuide.link(link);
  } catch (error) {
    alertError(error.message);
    throw error;
  }
}
function Button({ cssType, innerText, onClick = () => {
} }) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("button");
  button.classList.add(`button--${cssType}`);
  button.classList.add("text-caption");
  button.innerText = innerText;
  button.addEventListener("click", () => {
    onClick();
  });
  return button;
}
function ButtonContainer({ buttons = [] }) {
  const container = document.createElement("div");
  container.className = "button-container";
  buttons.forEach((button) => container.appendChild(button));
  return container;
}
function getInput(name) {
  const value = document.querySelector(`[name=${name}]`).value;
  return value;
}
class FoodItem {
  constructor() {
    __privateAdd(this, _FoodItem_instances);
    __publicField(this, "foodItem");
    this.foodItem = {
      category: getInput("category"),
      name: getInput("name"),
      distance: getInput("distance"),
      description: getInput("description"),
      link: getInput("link")
    };
  }
  getFoodItem() {
    try {
      validateFoodItem(this.foodItem);
      return __privateMethod(this, _FoodItem_instances, createFoodItem_fn).call(this);
    } catch (error) {
      return;
    }
  }
}
_FoodItem_instances = new WeakSet();
getImgSrcAlt_fn = function(category) {
  const categoryMap = {
    한식: { imgAlt: "한식", imgSrc: "./category-korean.png" },
    중식: { imgAlt: "중식", imgSrc: "./category-chinese.png" },
    일식: { imgAlt: "일식", imgSrc: "./category-japanese.png" },
    양식: { imgAlt: "양식", imgSrc: "./category-western.png" },
    아시안: { imgAlt: "아시안", imgSrc: "./category-asian.png" }
  };
  return categoryMap[category] || { imgAlt: "기타", imgSrc: "./category-etc.png" };
};
createFoodItem_fn = function() {
  const container = document.createElement("div");
  const { category, name, distance, description, link } = this.foodItem;
  const { imgSrc, imgAlt } = __privateMethod(this, _FoodItem_instances, getImgSrcAlt_fn).call(this, category);
  container.innerHTML = `
     <li class="restaurant">
          <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;
  return container.firstElementChild;
};
class FoodList {
  constructor() {
    __publicField(this, "foodItems");
    this.foodItems = this.getPreviousFoodList();
  }
  getPreviousFoodList() {
    const foodItems = document.querySelectorAll(".restaurant-list li");
    return foodItems;
  }
  updateFoodList(foodItem) {
    this.foodItems = [...this.foodItems, foodItem];
    const foodListContainer = document.querySelector(".restaurant-list");
    foodListContainer.innerHTML = "";
    this.foodItems.forEach((item) => {
      foodListContainer.appendChild(item);
    });
  }
}
function renderCaption(caption) {
  return caption ? `<span class="help-text text-caption">${caption}</span>` : "";
}
function Input({ isRequired = false, name, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
  <label for="link text-caption">${label}</label>
  <input type="text" name="${name}" id="${name}" />
  ${renderCaption(caption)}
  `;
  return container;
}
function SelectInput({
  isRequired = false,
  name,
  label,
  optionList = []
}) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `         
           <label for="category text-caption">${label}</label>
            <select name=${name} id=${name} required>
            <option value="">선택해 주세요</option>
            ${optionList.map((option) => {
    return `<option value="${option.value}">${option.label}</option>`;
  })}
            </select>
    `;
  return container;
}
function TextareaInput({ isRequired = false, label, caption, name }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
                <label for=${name} text-caption">설명</label>
              <textarea
                name=${name}
                id=${name}
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
  `;
  return container;
}
class Modal {
  constructor(modalContent) {
    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
        </div>
  `;
    document.querySelector("main").appendChild(container);
    document.querySelector(".modal-container").appendChild(modalContent);
    document.querySelector(".modal-backdrop").addEventListener("click", () => {
      Modal.close();
    });
  }
  static open() {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal--open");
  }
  static close() {
    document.querySelector(".modal--open");
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal--open");
  }
}
const SELECT_OPTIONS = {
  category: [
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "아시안", label: "아시안" },
    { value: "기타", label: "기타" }
  ],
  distance: [
    { value: "5", label: "5분 내" },
    { value: "10", label: "10분 내" },
    { value: "15", label: "15분 내" },
    { value: "20", label: "20분 내" },
    { value: "30", label: "30분 내" }
  ]
};
function addFoodItem() {
  const foodItem = new FoodItem();
  const foodInfo = foodItem.getFoodItem();
  if (!foodInfo) return;
  const foodList = new FoodList();
  foodList.updateFoodList(foodInfo);
  Modal.close();
}
function FoodForm() {
  const container = document.createElement("form");
  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "category",
      label: "카테고리",
      optionList: SELECT_OPTIONS.category
    })
  );
  container.appendChild(
    Input({
      isRequired: true,
      name: "name",
      label: "이름"
    })
  );
  container.appendChild(
    SelectInput({
      isRequired: true,
      name: "distance",
      label: "거리(도보 이동 시간)",
      optionList: SELECT_OPTIONS.distance
    })
  );
  container.appendChild(
    TextareaInput({
      isRequired: false,
      label: "설명",
      caption: CAPTION.description,
      name: "description"
    })
  );
  container.appendChild(
    Input({
      isRequired: false,
      label: "참고 링크",
      name: "link",
      caption: CAPTION.link
    })
  );
  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "취소하기",
          onClick: Modal.close
        }),
        Button({
          cssType: "primary",
          innerText: "추가하기",
          onClick: addFoodItem
        })
      ]
    })
  );
  return container;
}
function Header({ title = "제목", icon = null }) {
  const header = document.createElement("header");
  header.className = "gnb";
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
   `;
  if (icon) {
    header.appendChild(icon);
  }
  return header;
}
class FoodListPage {
  constructor(title, iconButton = null) {
    __privateAdd(this, _body);
    this.loadHeader(title, iconButton);
    this.loadMain();
    this.loadFoodList();
  }
  loadHeader(title, iconButton) {
    __privateSet(this, _body, document.querySelector("body"));
    if (iconButton) {
      __privateGet(this, _body).appendChild(Header({ title, icon: iconButton }));
    } else {
      __privateGet(this, _body).appendChild(Header({ title }));
    }
  }
  loadMain() {
    const main = document.createElement("main");
    __privateGet(this, _body).appendChild(main);
  }
  loadFoodList() {
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>
    `;
  }
}
_body = new WeakMap();
addEventListener("load", () => {
  const addFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: Modal.open
  });
  new FoodListPage("점심 뭐 먹지", addFoodItemIcon);
  new Modal(FoodForm());
});
