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
var _categoryFilter, _sortingFilter, _Filter_instances, sortBy_fn, _body, _main, _filter, _Module_instances, setFoodFormMoal_fn, setFilteredItems_fn, setFavoriteButton_fn, updateFoodList_fn;
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
function IconButton({
  imgSrc,
  label,
  onClick = () => {
  }
}) {
  const container = document.createElement("div");
  container.innerHTML = `
      <button type="button" class="gnb__button" aria-label="${label}">
      <img src="${imgSrc}" alt="${label}" /></button
    >
    `;
  const ButtonContainer2 = container.querySelector("button");
  if (ButtonContainer2)
    ButtonContainer2.addEventListener("click", (event) => {
      onClick(event);
    });
  return container.firstElementChild;
}
function FoodItem({
  foodItem,
  handleModal = () => {
  },
  handleTabButton: handleTabButton2 = () => {
  }
}) {
  const {
    imgSrc,
    imgAlt,
    name,
    distance,
    description,
    link,
    favorite = false
  } = foodItem;
  const itemContainer = document.createElement("li");
  itemContainer.className = "restaurant";
  itemContainer.addEventListener("click", () => {
    handleModal(foodItem);
  });
  const convertStarImg = favorite ? "./filled-star.png" : "./empty-star.png";
  const favoriteIcon = IconButton({
    imgSrc: convertStarImg,
    label: "즐겨찾기 버튼",
    onClick: (event) => handleTabButton2(event, foodItem)
  });
  favoriteIcon == null ? void 0 : favoriteIcon.classList.add("restaurant-star");
  itemContainer.innerHTML = `
        <div class="restaurant__category">
          <img src=${imgSrc} alt=${imgAlt} class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
          `;
  favoriteIcon && itemContainer.appendChild(favoriteIcon);
  return itemContainer;
}
const foodItems = [
  {
    imgSrc: "./category-korean.png",
    imgAlt: "한식",
    name: "피양콩할마니",
    distance: "10",
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
    link: "https://www.naver.com/",
    favorite: false
  },
  {
    imgSrc: "./category-chinese.png",
    imgAlt: "중식",
    name: "친친",
    distance: "5",
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다",
    link: "https://www.naver.com/",
    favorite: false
  },
  {
    imgSrc: "./category-japanese.png",
    imgAlt: "일식",
    name: "잇쇼우",
    distance: "10",
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다",
    link: "https://www.naver.com/",
    favorite: false
  },
  {
    imgSrc: "./category-western.png",
    imgAlt: "양식",
    name: "이태리키친",
    distance: "20",
    description: "늘 변화를 추구하는 이태리키친입니다.",
    link: "https://www.naver.com/",
    favorite: false
  },
  {
    imgSrc: "./category-asian.png",
    imgAlt: "아시안",
    name: "호아빈 삼성점",
    distance: "15",
    description: "푸짐한 양에 국물이 일품인 쌀국수",
    link: "https://www.naver.com/",
    favorite: false
  },
  {
    imgSrc: "./category-etc.png",
    imgAlt: "기타",
    name: "도스타코스 선릉점",
    distance: "5",
    description: "멕시칸 캐주얼 그릴",
    link: "https://www.naver.com/",
    favorite: false
  }
];
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
function FoodDetail({ filter, foodDetailItem }) {
  const container = document.createElement("div");
  const foodDetailInfo = FoodItem({
    foodItem: foodDetailItem,
    handleModal: () => {
    },
    handleTabButton: (event, foodItem) => handleTabButton$1({ foodItem, filter })
  });
  const linkCompennt = document.createElement("div");
  linkCompennt.innerHTML = foodDetailItem.link;
  foodDetailInfo.appendChild(linkCompennt);
  foodDetailInfo.style.flexDirection = "column";
  foodDetailInfo.style.gap = "16px";
  container.appendChild(foodDetailInfo);
  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "삭제하기",
          onClick: () => deleteFoodItem({ filter, newFoodItem: foodDetailItem })
        }),
        Button({
          cssType: "primary",
          innerText: "닫기",
          onClick: () => Modal.close({ filter })
        })
      ]
    })
  );
  return container;
}
function handleTabButton$1({ foodItem, filter }) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });
  Modal.setContent({
    filter,
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem })
  });
}
function getInput({ name }) {
  var _a;
  const value = (_a = document.querySelector(`.form-item [name=${name}]`)) == null ? void 0 : _a.value;
  return value;
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
function alertError({ error }) {
  var _a;
  if (!document.querySelector(".alert")) {
    (_a = document.querySelector("body")) == null ? void 0 : _a.appendChild(Alert({ message: error }));
    setTimeout(() => {
      var _a2;
      (_a2 = document.querySelector(".alert")) == null ? void 0 : _a2.remove();
    }, 1500);
  }
}
function setError({ name }) {
  var _a;
  (_a = document.querySelector(`[name=${name}]`)) == null ? void 0 : _a.classList.add("error");
}
function removeError({ name }) {
  var _a;
  (_a = document.querySelector(`[name=${name}]`)) == null ? void 0 : _a.classList.remove("error");
}
function resetError() {
  ["category", "name", "distance", "description", "link"].forEach((key) => {
    return removeError({ name: key });
  });
}
const ERROR_MESSAGE = {
  required: "필수 입력 항목이 비어있습니다.",
  length: (length) => `최대 ${length}자까지 입력할 수 있습니다.`,
  url: "올바르지 않는 URL입니다. (http(s)~ 로 시작하는 URL을 입력해주세요.)"
};
const CAPTION_MESSAGE = {
  description: "메뉴 등 추가 정보를 입력해 주세요",
  link: "매장 정보를 확인할 수 있는 링크를 입력해 주세요"
};
class InputGuide {
  constructor({ name, message }) {
    __publicField(this, "error");
    setError({ name });
    this.error = new Error(message);
    throw this.error;
  }
  static category({ input }) {
    const inputId = "category";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    removeError({ name: inputId });
  }
  static name({ input, maxLength }) {
    const inputId = "name";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    if (input.length > maxLength) {
      return new InputGuide({
        name: inputId,
        message: ERROR_MESSAGE.length(maxLength)
      });
    }
    removeError({ name: inputId });
  }
  static distance({ input }) {
    const inputId = "distance";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    removeError({ name: inputId });
  }
  static description({ input, maxLength }) {
    const inputId = "description";
    if (input.length > maxLength) {
      return new InputGuide({
        name: inputId,
        message: ERROR_MESSAGE.length(maxLength)
      });
    }
    removeError({ name: inputId });
  }
  static link({ input }) {
    const inputId = "link";
    if (!input) return;
    try {
      new URL(input);
    } catch (error) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.url });
    }
    removeError({ name: inputId });
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
    InputGuide.category({ input: category });
    InputGuide.name({ input: name, maxLength: NAME_MAX_LENGTH });
    InputGuide.distance({ input: distance });
    InputGuide.description({
      input: description,
      maxLength: DESCRIPTION_MAX_LENGTH
    });
    InputGuide.link({ input: link });
  } catch (error) {
    alertError({ error: error.message });
    throw error;
  }
}
function getFormFoodItem() {
  const foodItem = {
    category: getInput({ name: "category" }),
    name: getInput({ name: "name" }),
    distance: getInput({ name: "distance" }),
    description: getInput({ name: "description" }),
    link: getInput({ name: "link" })
  };
  const { imgSrc, imgAlt } = getImgSrcAlt(foodItem.category);
  try {
    validateFoodItem(foodItem);
    return {
      imgSrc,
      imgAlt,
      name: foodItem.name,
      distance: foodItem.distance,
      description: foodItem.description,
      link: foodItem.link,
      favorite: false
    };
  } catch (error) {
    return;
  }
}
function getImgSrcAlt(category) {
  const categoryMap = {
    한식: { imgAlt: "한식", imgSrc: "./category-korean.png" },
    중식: { imgAlt: "중식", imgSrc: "./category-chinese.png" },
    일식: { imgAlt: "일식", imgSrc: "./category-japanese.png" },
    양식: { imgAlt: "양식", imgSrc: "./category-western.png" },
    아시안: { imgAlt: "아시안", imgSrc: "./category-asian.png" }
  };
  return categoryMap[category] || { imgAlt: "기타", imgSrc: "./category-etc.png" };
}
function readStorageFoodList() {
  const localStorageFoodList = localStorage.getItem("foodList");
  return localStorageFoodList ? JSON.parse(localStorageFoodList) : [];
}
function updateStorageFoodList({
  newFoodItem
}) {
  let foodItems2 = readStorageFoodList();
  const index = foodItems2.findIndex(
    (item) => item.name === newFoodItem.name
  );
  if (index !== -1) {
    foodItems2[index].favorite = newFoodItem.favorite;
  } else {
    foodItems2.push(newFoodItem);
  }
  localStorage.setItem("foodList", JSON.stringify(foodItems2));
  return foodItems2;
}
function deleteStorageFoodList({
  newFoodItem
}) {
  let foodItems2 = readStorageFoodList();
  foodItems2 = foodItems2.filter(
    (foodItem) => JSON.stringify(foodItem) != JSON.stringify(newFoodItem)
  );
  localStorage.setItem("foodList", JSON.stringify(foodItems2));
  return foodItems2;
}
function handleTabButton({
  event,
  foodItem,
  filter
}) {
  const newFoodItem = foodItem;
  newFoodItem.favorite = !foodItem.favorite;
  updateFoodList({ foodItem });
  showConvertedItem({ filter, favoriteFilter: isFavoriteState() });
  event.stopPropagation();
}
function isFavoriteState() {
  var _a;
  return ((_a = document.querySelector(".tab-button .tab-button_favorite")) == null ? void 0 : _a.classList.contains("selected-button")) || false;
}
function readFoodList({ favoriteFilter }) {
  const previousFoodList = readStorageFoodList().filter((item) => {
    if (favoriteFilter) return item.favorite === true;
    return item;
  });
  if (previousFoodList.length === 0 && !favoriteFilter) {
    localStorage.setItem("foodList", JSON.stringify(foodItems));
  }
  return previousFoodList;
}
function addFoodFormItem({ filter }) {
  const foodItem = getFormFoodItem();
  if (!foodItem) return;
  updateStorageFoodList({ newFoodItem: foodItem });
  Modal.close({ filter });
}
function updateFoodList({ foodItem }) {
  updateStorageFoodList({ newFoodItem: foodItem });
}
function deleteFoodItem({ filter, newFoodItem }) {
  deleteStorageFoodList({ newFoodItem });
  Modal.close({ filter });
}
function convertStorageToLocal({
  filter,
  foodList
}) {
  const FoodItemListComponent = foodList.map((localFoodItem) => {
    const foodComponent = FoodItem({
      foodItem: localFoodItem,
      handleModal: (foodItem) => openDetailModal({ filter, foodItem }),
      handleTabButton: (event, foodItem) => handleTabButton({ event, foodItem, filter })
    });
    return foodComponent;
  });
  showFoodItem({ foodListComponent: FoodItemListComponent || [] });
}
function openDetailModal({ filter, foodItem }) {
  Modal.setContent({
    filter,
    modalContent: FoodDetail({ filter, foodDetailItem: foodItem })
  });
  Modal.open();
}
function showFoodItem({ foodListComponent }) {
  const foodListContainer = document.querySelector(".restaurant-list");
  if (foodListContainer) foodListContainer.innerHTML = "";
  [...foodListComponent].forEach((item) => {
    foodListContainer == null ? void 0 : foodListContainer.appendChild(item);
  });
}
function showConvertedItem({
  favoriteFilter,
  filter
}) {
  const previousFoodList = readFoodList({ favoriteFilter });
  convertStorageToLocal({
    filter,
    foodList: filter.sortedFoodList({ foodList: previousFoodList })
  });
}
class Modal {
  static setDefaultModal() {
    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = `
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
          </div>
    `;
    const mainCotainer = document.querySelector("main");
    if (mainCotainer) mainCotainer.appendChild(container);
  }
  static setContent({ filter, modalContent }) {
    var _a;
    const modalContainer = document.querySelector(".modal-container");
    modalContainer && (modalContainer.innerHTML = "");
    modalContainer == null ? void 0 : modalContainer.appendChild(modalContent);
    (_a = document.querySelector(".modal-backdrop")) == null ? void 0 : _a.addEventListener("click", () => {
      Modal.close({ filter });
    });
  }
  static open() {
    const modal = document.querySelector(".modal");
    modal == null ? void 0 : modal.classList.add("modal--open");
  }
  static close({ filter }) {
    const modalContent = document.querySelector(".modal");
    modalContent == null ? void 0 : modalContent.classList.remove("modal--open");
    showConvertedItem({ favoriteFilter: isFavoriteState(), filter });
  }
}
class Filter {
  constructor() {
    __privateAdd(this, _Filter_instances);
    __privateAdd(this, _categoryFilter);
    __privateAdd(this, _sortingFilter);
    __privateSet(this, _categoryFilter, "전체");
    __privateSet(this, _sortingFilter, "이름순");
  }
  chageFilter({ foodList, filter }) {
    var _a;
    const filterOption = (_a = document.querySelector(`select[name=${filter}]`)) == null ? void 0 : _a.value;
    if (filter === "category") __privateSet(this, _categoryFilter, filterOption);
    else __privateSet(this, _sortingFilter, filterOption);
    return this.updateFilterItem({ foodList });
  }
  updateFilterItem({ foodList }) {
    const foodItems2 = [...foodList];
    const filteredItems = foodItems2 == null ? void 0 : foodItems2.filter((foodItem) => {
      if (__privateGet(this, _categoryFilter) === "전체") return foodItem;
      return foodItem.imgAlt === __privateGet(this, _categoryFilter);
    }).sort((a, b) => __privateMethod(this, _Filter_instances, sortBy_fn).call(this, { a, b }));
    return filteredItems || [];
  }
  sortedFoodList({ foodList }) {
    var _a;
    return ((_a = this.updateFilterItem({ foodList })) == null ? void 0 : _a.sort(
      (a, b) => __privateMethod(this, _Filter_instances, sortBy_fn).call(this, { a, b })
    )) || [];
  }
}
_categoryFilter = new WeakMap();
_sortingFilter = new WeakMap();
_Filter_instances = new WeakSet();
sortBy_fn = function({ a, b }) {
  if (__privateGet(this, _sortingFilter) === "이름순") {
    return a.name.localeCompare(b.name, "ko");
  }
  if (__privateGet(this, _sortingFilter) === "거리순") {
    return Number(a.distance) - Number(b.distance);
  }
  return 0;
};
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
const categoryFilter = [
  { value: "전체", text: "전체" },
  { value: "한식", text: "한식" },
  { value: "중식", text: "중식" },
  { value: "일식", text: "일식" },
  { value: "양식", text: "양식" },
  { value: "아시안", text: "아시안" },
  { value: "기타", text: "기타" }
];
const sortingFilter = [
  { value: "이름순", text: "이름순" },
  { value: "거리순", text: "거리순" }
];
const _FoodListPage = class _FoodListPage {
  constructor({ title, iconButton = null }) {
    __privateAdd(this, _body);
    __privateAdd(this, _main);
    __privateSet(this, _body, null);
    __privateSet(this, _main, null);
    this.loadHeader({ title, iconButton });
    this.loadMain();
    this.loadTabButton();
    this.loadFilter();
    this.loadFoodList();
  }
  static loadPage({ title }) {
    const AddFoodItemIcon = IconButton({
      imgSrc: "./add-button.png",
      label: "음식점 추가",
      onClick: () => {
      }
    });
    return new _FoodListPage({ title, iconButton: AddFoodItemIcon });
  }
  loadHeader({ title, iconButton }) {
    var _a, _b;
    __privateSet(this, _body, document.querySelector("body"));
    if (iconButton) {
      (_a = __privateGet(this, _body)) == null ? void 0 : _a.appendChild(Header({ title, icon: iconButton }));
    } else {
      (_b = __privateGet(this, _body)) == null ? void 0 : _b.appendChild(Header({ title, icon: null }));
    }
  }
  loadMain() {
    var _a;
    __privateSet(this, _main, document.createElement("main"));
    (_a = __privateGet(this, _body)) == null ? void 0 : _a.appendChild(__privateGet(this, _main));
  }
  loadTabButton() {
    var _a;
    const container = document.createElement("div");
    container.className = "tab-button";
    container.innerHTML = `
        <button class="tab-button_all"> 모든 음식점 </button>
        <button class="tab-button_favorite"> 자주 가는 음식점 </button>
    `;
    (_a = __privateGet(this, _main)) == null ? void 0 : _a.appendChild(container);
  }
  loadFilter() {
    var _a;
    const container = document.createElement("section");
    container.className = "restaurant-filter-container";
    container.innerHTML = `

          <select name="category" id="category-filter" class="restaurant-filter">
          ${categoryFilter.map(
      ({ value, text }) => `<option value=${value}>${text}</option>`
    )}
          </select>

          <!-- 정렬 셀렉트 박스 -->
          <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${sortingFilter.map(
      ({ value, text }) => `<option value=${value}>${text}</option>`
    )}
          </select>
    `;
    (_a = __privateGet(this, _main)) == null ? void 0 : _a.appendChild(container);
  }
  loadFoodList() {
    var _a;
    const container = document.createElement("div");
    container.className = "restaurant-list-container";
    container.innerHTML = `
      <ul class="restaurant-list">
      </ul>
    `;
    (_a = __privateGet(this, _main)) == null ? void 0 : _a.appendChild(container);
  }
};
_body = new WeakMap();
_main = new WeakMap();
let FoodListPage = _FoodListPage;
function RenderCaption(caption) {
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
  ${RenderCaption(caption)}
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
            ${optionList.map((option) => {
    return `<option value="${option.value}">${option.label}</option>`;
  })}
            </select>
    `;
  return container;
}
function TextareaInput({
  isRequired = false,
  label,
  caption,
  name
}) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `
                <label for=${name} text-caption">${label}</label>
              <textarea
                name=${name}
                id=${name}
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >${caption}</span
              >
  `;
  return container;
}
const SELECT_OPTIONS = {
  category: [
    { value: "", label: "선택해 주세요" },
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "아시안", label: "아시안" },
    { value: "기타", label: "기타" }
  ],
  distance: [
    { value: "", label: "선택해 주세요" },
    { value: "5", label: "5분 내" },
    { value: "10", label: "10분 내" },
    { value: "15", label: "15분 내" },
    { value: "20", label: "20분 내" },
    { value: "30", label: "30분 내" }
  ]
};
function FoodForm({ filter }) {
  var _a;
  (_a = document.querySelector("form")) == null ? void 0 : _a.reset();
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
      label: "이름",
      caption: ""
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
      caption: CAPTION_MESSAGE.description,
      name: "description"
    })
  );
  container.appendChild(
    Input({
      isRequired: false,
      label: "참고 링크",
      name: "link",
      caption: CAPTION_MESSAGE.link
    })
  );
  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "취소하기",
          onClick: () => Modal.close({ filter })
        }),
        Button({
          cssType: "primary",
          innerText: "추가하기",
          onClick: () => addFoodFormItem({ filter })
        })
      ]
    })
  );
  return container;
}
class Module {
  constructor(filter) {
    __privateAdd(this, _Module_instances);
    __privateAdd(this, _filter);
    __privateSet(this, _filter, filter);
  }
  init() {
    __privateMethod(this, _Module_instances, setFoodFormMoal_fn).call(this);
    __privateMethod(this, _Module_instances, setFilteredItems_fn).call(this);
    __privateMethod(this, _Module_instances, setFavoriteButton_fn).call(this);
  }
}
_filter = new WeakMap();
_Module_instances = new WeakSet();
// FoodForm 생성
setFoodFormMoal_fn = function() {
  var _a;
  (_a = document.querySelector(".gnb__button")) == null ? void 0 : _a.addEventListener("click", () => {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
    formContainer.appendChild(FoodForm({ filter: __privateGet(this, _filter) }));
    Modal.setContent({ filter: __privateGet(this, _filter), modalContent: formContainer });
    Modal.open();
  });
};
// Filter 기능 설정
setFilteredItems_fn = function() {
  ["category", "sorting"].forEach((name) => {
    var _a;
    (_a = document.querySelector(`select[name=${name}]`)) == null ? void 0 : _a.addEventListener("change", () => {
      const previousFoodList = readFoodList({
        favoriteFilter: isFavoriteState()
      });
      const filteredItems = __privateGet(this, _filter).chageFilter({
        foodList: previousFoodList,
        filter: name
      });
      convertStorageToLocal({
        filter: __privateGet(this, _filter),
        foodList: filteredItems
      });
    });
  });
};
setFavoriteButton_fn = function() {
  var _a;
  const buttons = {
    total: document.querySelector(".tab-button .tab-button_all"),
    favorite: document.querySelector(".tab-button .tab-button_favorite")
  };
  (_a = buttons.total) == null ? void 0 : _a.classList.toggle("selected-button");
  __privateMethod(this, _Module_instances, updateFoodList_fn).call(this, false);
  Object.entries(buttons).forEach(([key, button]) => {
    button == null ? void 0 : button.addEventListener("click", () => {
      var _a2;
      if (button.classList.contains("selected-button")) return;
      button.classList.toggle("selected-button");
      (_a2 = buttons[key === "total" ? "favorite" : "total"]) == null ? void 0 : _a2.classList.remove(
        "selected-button"
      );
      __privateMethod(this, _Module_instances, updateFoodList_fn).call(this, key === "favorite");
    });
  });
};
updateFoodList_fn = function(isFavorite) {
  showConvertedItem({ filter: __privateGet(this, _filter), favoriteFilter: isFavorite });
};
addEventListener("load", () => {
  const filter = new Filter();
  FoodListPage.loadPage({
    title: "점심 뭐 먹지"
  });
  Modal.setDefaultModal();
  const module = new Module(filter);
  module.init();
});
