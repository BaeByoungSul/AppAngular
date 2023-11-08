import { Component } from '@angular/core';

@Component({
  selector: 'app-test-layout',
  templateUrl: './test-layout.component.html',
  styleUrls: ['./test-layout.component.css']
})
export class TestLayoutComponent {

  defaultSections = [
		{id:1, name: 'Entries and Accounts', subSections: [
			{id:1, name: 'Journal Entries' , icon: 'book'},
			{id:2, name: 'charts of Accounts', icon: 'account_balance'},
		]},
		{id:2, name: 'Financial Reports', subSections: [
			{id:1, name: 'General Ledure', icon: 'library_books'},
			{id:2, name: 'Income Statement', icon: 'event_notes'},
			{id:3, name: 'Balance Sheet', icon: 'event_notes'},
			{id:4, name: 'Cash Flow', icon: 'attach_money'}
		]},
		{id:3, name: 'Bulletins and Currencies', subSections: [
			{id:1, name: 'Exchange Rate Bulletins', icon: 'format_list_bulleted'},
			{id:2, name: 'Currencies', icon: 'monetization_on'},
		]}

		];
}