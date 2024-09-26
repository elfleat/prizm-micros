function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value =
		escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i,
		x,
		y,
		ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}

var inViewportClass = "in-viewport";
var stickyClass = "is-sticky";
var cookieName = "AGE-VERIFIED";

class ShowingAreasHandler {
	constructor() {
		this.elements = {
			wayz: document.querySelector("#wayz-to-enjoy"),
			header: document.querySelector(".site-header-container"),
			verificationModalCta: document.querySelector(
				".verification-modal-content .main-cta"
			),
			verificationModalCta2: document.querySelector(
				".verification-modal-content .secondary-cta"
			),
		};

		if (this.elements.wayz) {
			window.addEventListener("scroll", this.watch.bind(this));
		}

		if (this.elements.header) {
			this.headerCheck();
			window.addEventListener("scroll", this.headerCheck.bind(this));
		}

		if (this.elements.verificationModalCta) {
			this.elements.verificationModalCta.addEventListener(
				"click",
				function (e) {
					setCookie(cookieName, true);
					document
						.querySelector(".verification-modal-container")
						.classList.add("is-hidden");
					return;
				}
			);
			this.elements.verificationModalCta2.addEventListener(
				"click",
				function (e) {
					window.location.href = "https://google.com/";
				}
			);
		}
	}
	watch() {
		this.check(this.elements.wayz);
	}
	check(element) {
		var myElement = element;
		var bounding = myElement.getBoundingClientRect();
		var myElementHeight = myElement.offsetHeight;
		var myElementWidth = myElement.offsetWidth;
		var bounding = myElement.getBoundingClientRect();

		if (
			bounding.top >= -myElementHeight &&
			bounding.left >= -myElementWidth &&
			bounding.right <=
				(window.innerWidth || document.documentElement.clientWidth) +
					myElementWidth &&
			bounding.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) +
					myElementHeight
		) {
			if (!myElement.classList.contains(inViewportClass)) {
				myElement.classList.add(inViewportClass);
				console.log("class added to", myElement);
			}
		} else {
			if (myElement.classList.contains(inViewportClass)) {
				myElement.classList.remove(inViewportClass);
				console.log("class removed from ", myElement);
			}
		}
	}

	headerCheck() {
		if (
			window.scrollY > 0 &&
			!this.elements.header.classList.contains(stickyClass)
		) {
			this.elements.header.classList.add(stickyClass);
			console.log("sticky class added");
		} else if (
			window.scrollY === 0 &&
			this.elements.header.classList.contains(stickyClass)
		) {
			this.elements.header.classList.remove(stickyClass);
			console.log("sticky class removed");
		}
	}
}

class elementorHelloThemeHandler {
	constructor() {
		this.initSettings();
		this.initElements();
		this.bindEvents();
		new ShowingAreasHandler();
	}

	initSettings() {
		this.settings = {
			selectors: {
				menuToggle: ".site-header .site-navigation-toggle",
				menuToggleHolder: ".site-header .site-navigation-toggle-holder",
				dropdownMenu: ".site-header .site-navigation-dropdown",
			},
		};
	}

	initElements() {
		this.elements = {
			window,
			menuToggle: document.querySelector(this.settings.selectors.menuToggle),
			menuToggleHolder: document.querySelector(
				this.settings.selectors.menuToggleHolder
			),
			dropdownMenu: document.querySelector(
				this.settings.selectors.dropdownMenu
			),
		};
	}

	bindEvents() {
		if (
			!this.elements.menuToggleHolder ||
			this.elements.menuToggleHolder?.classList.contains("hide")
		) {
			return;
		}

		this.elements.menuToggle.addEventListener("click", () =>
			this.handleMenuToggle()
		);

		this.elements.dropdownMenu
			.querySelectorAll(".menu-item-has-children > a")
			.forEach((anchorElement) =>
				anchorElement.addEventListener("click", (event) =>
					this.handleMenuChildren(event)
				)
			);
	}

	closeMenuItems() {
		this.elements.menuToggleHolder.classList.remove("elementor-active");
		this.elements.window.removeEventListener("resize", () =>
			this.closeMenuItems()
		);
	}

	handleMenuToggle() {
		const isDropdownVisible =
			!this.elements.menuToggleHolder.classList.contains("elementor-active");

		this.elements.menuToggle.setAttribute("aria-expanded", isDropdownVisible);
		this.elements.dropdownMenu.setAttribute("aria-hidden", !isDropdownVisible);
		this.elements.dropdownMenu.inert = !isDropdownVisible;
		this.elements.menuToggleHolder.classList.toggle(
			"elementor-active",
			isDropdownVisible
		);

		// Always close all sub active items.
		this.elements.dropdownMenu
			.querySelectorAll(".elementor-active")
			.forEach((item) => item.classList.remove("elementor-active"));

		if (isDropdownVisible) {
			this.elements.window.addEventListener("resize", () =>
				this.closeMenuItems()
			);
		} else {
			this.elements.window.removeEventListener("resize", () =>
				this.closeMenuItems()
			);
		}
	}

	handleMenuChildren(event) {
		const anchor = event.currentTarget;
		const parentLi = anchor.parentElement;

		if (!parentLi?.classList) {
			return;
		}

		parentLi.classList.toggle("elementor-active");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new elementorHelloThemeHandler();
});
