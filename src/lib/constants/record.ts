export enum RecordCategory {
	NONE = '',
	FOOD = 'food',
	TRANSPORTATION = 'transportation',
	HOUSING = 'housing',
	UTILITIES = 'utilities',
	ENTERTAINMENT = 'entertainment',
	HEALTH = 'health',
	EDUCATION = 'education',
	INVESTMENT = 'investment',
	LOAN = 'loan',
	DEBT = 'debt',
	INSURANCE = 'insurance',
	TAX = 'tax',
	OTHER = 'other',
}

export interface Record {
	category: RecordCategory;
	amount: number | null;
	description?: string;
	date: string;
}

export const record: Record[] = [];