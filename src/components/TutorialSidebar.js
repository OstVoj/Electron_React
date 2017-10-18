'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import {addClasses,hasClass} from 'metal-dom';
import {dispatchGlobalState} from './utils';
import moment from 'moment';

import templates from './TutorialSidebar.soy';

class TutorialSidebar extends Component {

	syncPage(val) {
		this.navigationToggler = page.navigationToggler;
	}

	attached() {
		this.calculateTimeRemaining();
	}

	calculateTimeRemaining() {
		let timeRead = 0;
		let totalTime = 0;
		let indexSelected = -1;

		let sidebar = document.querySelector('.sidebar');
		let sidebarLinks = Array.prototype.slice.call(sidebar.querySelectorAll('.sidebar-link'));

		sidebarLinks.forEach((item, i) => {
			let time = parseInt(item.dataset.time || 0);

			totalTime += time;

			if (hasClass(item, 'sidebar-link-selected')) {
				indexSelected = i;
			}

			if (indexSelected === -1) {
				addClasses(item, 'sidebar-link-read');
				timeRead += time;

				return;
			}
		});

		let milliseconds = (totalTime - timeRead);
		let eventDuration = moment.duration(milliseconds, 'seconds');
		page.timeRemaining = this.humanizeDuration(eventDuration);
		dispatchGlobalState();
	}

	closeNavigationMenu(e) {
		page.navigationToggler = false;
		dispatchGlobalState();
	}

	humanizeDuration(eventDuration) {
		var eventDurationString = '';

		if (eventDuration.days() > 0) {
			eventDurationString += ' ' + moment.duration(eventDuration.days(), 'days').asDays() + 'd';
		}

		if (eventDuration.hours() > 0) {
			eventDurationString += ' ' + moment.duration(eventDuration.hours(), 'hours').asHours() + ' h';
		}

		if (eventDuration.minutes() > 0) {
			eventDurationString += ' ' + moment.duration(eventDuration.minutes(), 'minutes').asMinutes() + ' min';
		}

		if (eventDuration.seconds() > 0) {
			eventDurationString += ' ' + moment.duration(eventDuration.seconds(), 'seconds').asSeconds() + ' sec';
		}

		return eventDurationString.trim();
	}

};

TutorialSidebar.STATE = {
	navigationToggler: {
		internal: true,
		value: false
	}
}

Soy.register(TutorialSidebar, templates);

export default TutorialSidebar;
