import { deleteMoney, checkRemoveAddClass, noMoney, addMoney } from './functions.js';
import { checkBoughtItems, writeSelected, initStartData, initStartDataForCurrentLevel, configGame, startGame, stopGame, resetGame, exitGame } from './script.js';
import { startData } from './startData.js';

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	const targetElement = e.target;

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');
	const wrapper = document.querySelector('.wrapper');

	initStartData();

	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	if (targetElement.closest('[data-btn="shop"]')) {
		writeSelected();
		wrapper.classList.add('_shop');
	}

	if (targetElement.closest('[data-btn="shop-home"]')) {
		wrapper.classList.remove('_shop');
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');
	}

	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_game');
		initStartDataForCurrentLevel();
	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_slot');
	}

	//========================================================================================================================================================
	//shop

	if (targetElement.closest('[data-shop-button="1"]') && !targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_1) {
			deleteMoney(startData.prices.price_1, '.score');
			sessionStorage.setItem('item-1', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="1"]'));
		sessionStorage.setItem('current-item', 1);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_2) {
			deleteMoney(startData.prices.price_2, '.score');
			sessionStorage.setItem('item-2', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="2"]'));
		sessionStorage.setItem('current-item', 2);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_3) {
			deleteMoney(startData.prices.price_3, '.score');
			sessionStorage.setItem('item-3', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="3"]'));
		sessionStorage.setItem('current-item', 3);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="4"]') && !targetElement.closest('[data-item="4"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_4) {
			deleteMoney(startData.prices.price_4, '.score');
			sessionStorage.setItem('item-4', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="4"]') && targetElement.closest('[data-item="4"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="4"]'));
		sessionStorage.setItem('current-item', 4);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="5"]') && !targetElement.closest('[data-item="5"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_5) {
			deleteMoney(startData.prices.price_5, '.score');
			sessionStorage.setItem('item-5', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="5"]') && targetElement.closest('[data-item="5"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="5"]'));
		sessionStorage.setItem('current-item', 5);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="6"]') && !targetElement.closest('[data-item="6"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_6) {
			deleteMoney(startData.prices.price_6, '.score');
			sessionStorage.setItem('item-6', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="6"]') && targetElement.closest('[data-item="6"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="6"]'));
		sessionStorage.setItem('current-item', 6);
		writeSelected();
	}

	//========================================================================================================================================================
	// bet-box

	if (targetElement.closest('.bet-box__minus') && currentBet > startData.countBet) {
		sessionStorage.setItem('current-bet', currentBet - startData.countBet);
		if (document.querySelector(startData.nameBetScore)) document.querySelector(startData.nameBetScore).textContent = sessionStorage.getItem('current-bet');
	}

	if (targetElement.closest('.bet-box__plus') && money > currentBet + startData.countBet && currentBet < startData.maxBet) {
		sessionStorage.setItem('current-bet', currentBet + startData.countBet);
		if (document.querySelector(startData.nameBetScore)) document.querySelector(startData.nameBetScore).textContent = sessionStorage.getItem('current-bet');
	}
	//========================================================================================================================================================
	//game

	if (targetElement.closest('.game') && configGame.state === 3 && !targetElement.closest('[data-btn="game-home"]')) {
		console.log('3');
		resetGame();

	}

	if (targetElement.closest('.game') && configGame.state === 2 && !targetElement.closest('[data-btn="game-home"]')) {
		console.log('2');
		stopGame();
	}

	if (targetElement.closest('.game') && configGame.state === 1 && configGame.currentAttempt > 0 && !targetElement.closest('[data-btn="game-home"]')) {
		console.log('1');
		startGame();
	}

	if (targetElement.closest('.final__button')) {
		exitGame();
		document.querySelector('.final').classList.remove('_visible');
	}
})