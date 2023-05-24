import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';
import { startData } from './startData.js';

const knight = document.querySelector('.game__knight');

export function initStartData() {
	drawStartCurrentItem();
	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

}

function writeScore() {
	if (document.querySelector('.score')) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

export function writeCurrentBet() {
	const betItem = document.querySelectorAll(startData.nameBetScore);
	if (betItem.length) {
		betItem.forEach(item => {
			item.textContent = sessionStorage.getItem('current-bet');
		})
	}

}

initStartData();


//========================================================================================================================================================
//main

if (document.querySelector('.main')) {
	document.querySelector('.main').classList.add('_active');

	drawPrices();
	checkBoughtItems();
	removeSelectedItems();
	writeSelected();
}

function drawStartCurrentItem() {
	if (!sessionStorage.getItem('current-item')) sessionStorage.setItem('current-item', 1);
	if (!sessionStorage.getItem('item-1')) sessionStorage.setItem('item-1', true);
}

function drawPrices() {
	document.querySelector('[data-price="1"]').textContent = startData.prices.price_1;
	document.querySelector('[data-price="2"]').textContent = startData.prices.price_2;
	document.querySelector('[data-price="3"]').textContent = startData.prices.price_3;
	document.querySelector('[data-price="4"]').textContent = startData.prices.price_4;
	document.querySelector('[data-price="5"]').textContent = startData.prices.price_5;
	document.querySelector('[data-price="6"]').textContent = startData.prices.price_6;
}

export function checkBoughtItems() {
	if (sessionStorage.getItem('item-1')) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Select';
		document.querySelector('[data-item="1"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-2')) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Select';
		document.querySelector('[data-item="2"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-3')) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Select';
		document.querySelector('[data-item="3"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-4')) {
		document.querySelector('[data-shop-button="4"]').textContent = 'Select';
		document.querySelector('[data-item="4"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-5')) {
		document.querySelector('[data-shop-button="5"]').textContent = 'Select';
		document.querySelector('[data-item="5"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-6')) {
		document.querySelector('[data-shop-button="6"]').textContent = 'Select';
		document.querySelector('[data-item="6"]').classList.add('_bought');
	}
}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('.shop__item');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

export function writeSelected() {
	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought')) btn.textContent = 'Select';
	})

	if (+sessionStorage.getItem('current-item') === 1) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Selected';
		document.querySelector('[data-item="1"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-1.svg)';
	} else if (+sessionStorage.getItem('current-item') === 2) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Selected';
		document.querySelector('[data-item="2"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-2.svg)';
	} else if (+sessionStorage.getItem('current-item') === 3) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Selected';
		document.querySelector('[data-item="3"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-3.svg)';
	} else if (+sessionStorage.getItem('current-item') === 4) {
		document.querySelector('[data-shop-button="4"]').textContent = 'Selected';
		document.querySelector('[data-item="4"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-4.svg)';
	} else if (+sessionStorage.getItem('current-item') === 5) {
		document.querySelector('[data-shop-button="5"]').textContent = 'Selected';
		document.querySelector('[data-item="5"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-5.svg)';
	} else if (+sessionStorage.getItem('current-item') === 6) {
		document.querySelector('[data-shop-button="6"]').textContent = 'Selected';
		document.querySelector('[data-item="6"]').classList.add('_selected');
		knight.style.backgroundImage = 'url(img/shop/shop-6.svg)';
	}
}

//========================================================================================================================================================
// game

// Уровни
// При первом входе в игру - отображаем первый уровень.
//	Когда сыграли и израсходовали все попытки - повышаем уровень
// Можно каждому уровню задавать свою скорость вращения пиццы

// Экран игры
//	Кликаем по экрану, когда ничего не вращается:
//	Начинаем игру
//++	1. Запускаем вращение пиццы
//++	2. Пицца вращается пока не будет второго клика.
//++	3. Когда второй раз кликаем по экрану - останавливаем вращение и запускаем нож
//++	4. Снимаем одну попытку
//++	5. Проверяем, какое значение в попавшемся куске есть - добавляем его на счет
//++	6. Кликаем повторно - нож возвращается в исходное положение, и начинаем вращение пиццы
//++	7. Далее такой же алгоритм запуска ножа
//	8. После каждого запуска проверяем, остались ли попытки - если не остались, показываем окно с количеством выигрыша и кнопкой ок.
//	9. При клике на кнопку - возвращаемся на главный экран


export const configGame = {
	state: 1, // 1 - not play, 2 - вращается пицца, 3 - запустили нож
	level: 1, // всего 3 уровня

	startBottomPosKnight: 60,

	constAttempt: 4,
	currentAttempt: 4,

	currentWinCount: 0,
	levelWinCount: 0
}

const configDrum = {
	rotate: 0,

	offset: 0,
	maxOffset: 5,

	step: 0.2,

	diametr: 280,

	drum: document.querySelector('.game .pizza__body')
}

export function initStartDataForCurrentLevel() {
	if (configGame.level === 2) {
		configDrum.step = 0.4;
		configDrum.maxOffset = 12;
	} else if (configGame.level === 3) {
		configDrum.step = 0.6;
		configDrum.maxOffset = 25;
	}
}


export function startGame() {
	configGame.state = 2;
	animateDrum();
}

function animateDrum() {
	rotateDrum();
	if (configDrum.offset < configDrum.maxOffset) configDrum.offset += configDrum.step;

	if (configGame.state === 2) requestAnimationFrame(animateDrum);
}

function rotateDrum() {
	configDrum.rotate += configDrum.offset;
	configDrum.drum.style.transform = `rotate(${configDrum.rotate}deg)`;
}

export function stopGame() {
	// Останавливаем вращение пиццы
	configGame.state = 3;

	setTimeout(() => {
		const isNotEmptyPiece = checkCountPeacePizza();

		mooveKnight();

		decreaseAttempt();

		checkCountAttempts();

		configDrum.offset = 0;

		if (isNotEmptyPiece) {
			addMoney(configGame.currentWinCount, '.score', 1000, 2000);

			configGame.levelWinCount += configGame.currentWinCount;
		}
	}, 1000);

}

export function resetGame() {
	configGame.state = 1;
	moveKnightToStartPosition();

}

function decreaseAttempt() {
	const attempts = document.querySelectorAll('.game__attempts span');

	configGame.currentAttempt--;

	for (let i = 0; i < attempts.length; i++) {
		if (!attempts[i].classList.contains('_hide')) {
			attempts[i].classList.add('_hide');
			break;
		}
	}
}

function checkCountAttempts() {
	if (configGame.currentAttempt <= 0) {
		console.log('Попытки закончились, подсчитываем сколько заработали');
		setTimeout(() => {
			showFinalScreen(configGame.levelWinCount);
			if (configGame.level < 3) {
				configGame.level += 1;
			}

		}, 1000);

	} else {
		console.log('Бросаем дальше');
	}
}

function checkPathToPizza() {
	const pizza = document.querySelector('.game__pizza');
	const yBottomPizza = pizza.getBoundingClientRect().top + configDrum.diametr;

	const yTopKnight = knight.getBoundingClientRect().top;

	return yTopKnight - yBottomPizza;
}

function mooveKnight() {
	const yOffset = configGame.startBottomPosKnight + 40;
	knight.style.bottom = `${checkPathToPizza() + yOffset}px`;
}

function checkCountPeacePizza() {
	const dot = document.querySelector('.game__field span');
	const xOffset = dot.getBoundingClientRect().left;
	const yOffset = dot.getBoundingClientRect().top - 5;

	const elem = document.elementFromPoint(xOffset, yOffset);
	const parrent = elem.closest('[data-pizza]');

	if (parrent) {
		const count = +parrent.dataset.pizzaCount;

		configGame.currentWinCount = count;

		hideTargetPizza(parrent);

		return true;
	}
	return false;
}

function moveKnightToStartPosition() {
	knight.style.bottom = `${configGame.startBottomPosKnight}px`;
}

function hideTargetPizza(elem) {
	elem.classList.add('_hide');
}

export function exitGame() {
	configGame.levelWinCount = 0;
	configGame.currentWinCount = 0;
	configGame.currentAttempt = configGame.constAttempt;

	// configDrum.offset = 0;
	// configDrum.rotate = 0;

	removeHidePizza();
	removeHideAttempts();
	moveKnightToStartPosition();

	writeCurrentLevel();
}

function removeHidePizza() {
	const pizzaPieces = document.querySelectorAll('[data-pizza]');
	pizzaPieces.forEach(piece => {
		if (piece.classList.contains('_hide')) piece.classList.remove('_hide');
	})
}

function removeHideAttempts() {
	const attempts = document.querySelectorAll('.game__attempts span');
	attempts.forEach(attempt => {
		if (attempt.classList.contains('_hide')) attempt.classList.remove('_hide');
	})
}

function writeCurrentLevel() {
	document.querySelector('.main__level span').textContent = `LEVEL ${configGame.level}`;
	document.querySelector('.game__title').textContent = `LEVEL#${configGame.level}`;
}
//========================================================================================================================================================

export function showFinalScreen(count = 0) {
	const final = document.querySelector('.final');
	const finalCheck = document.querySelector('.final-check');

	finalCheck.textContent = `+${count}`;

	setTimeout(() => {
		final.classList.add('_visible');
	}, 500);
}
