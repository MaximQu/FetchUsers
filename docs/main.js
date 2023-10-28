"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchFormData = () => {
    const form = document.querySelector('.form');
    if (!form)
        return;
    const fetchUsers = (firstDate, lastDate) => __awaiter(void 0, void 0, void 0, function* () {
        const fetchData = yield fetch(`https://fakerapi.it/api/v1/persons?_quantity=6&_birthday_start=${firstDate}&_birthday_end=${lastDate}`);
        const res = yield fetchData.json();
        const list = document.querySelector('.user__wrapper');
        if (!list)
            return;
        list.innerHTML = '';
        const chunk = res.data
            .map((item) => {
            return `
                <li class="user__block">
                    <h2 class="user__title">${item.firstname} ${item.lastname}</h2>
                    <div class="user__list">
                        <p class="user__item"><a class="user__link" href="mailto:${item.email}"><svg class="icon">
                        <use xlink:href="#email"></use>
                      </svg>${item.email}</a></p>
                        <p class="user__item"><a class="user__link" href="tel:+${item.phone}"><svg class="icon">
                        <use xlink:href="#tel"></use>
                      </svg>${item.phone}</a></p>
                        <p class="user__item"><svg class="icon">
                        <use xlink:href="#gender"></use>
                      </svg>${item.gender}</p>
                        <p class="user__item"><svg class="icon">
                        <use xlink:href="#birthday"></use>
                      </svg>${item.birthday}</p>
                        <p class="user__item"><a class="user__link" href="${item.website}"> <svg class="icon">
                        <use xlink:href="#website"></use>
                      </svg>${item.website}</a></p>
                    </div>
                </li>
            `;
        })
            .join('');
        const range = document.createRange();
        range.selectNode(list);
        const fragment = range.createContextualFragment(chunk);
        list.appendChild(fragment);
        return res;
    });
    const sendForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const firstDate = formData.get('firstDate');
        const lastDate = formData.get('lastDate');
        if (firstDate === null || lastDate === null)
            return;
        fetchUsers(firstDate.toString(), lastDate.toString());
    };
    form.addEventListener('submit', sendForm);
};
fetchFormData();
