export enum RecordCategory {
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
	NONE = ''
}

export interface Record {
	category: RecordCategory;
	amount: number | null;
	description?: string;
}

export const record: Record[] = [];