export interface Conjugation {
  _id: number,
  verb: string,
  verbid: number,
  pronounid?: number,
  conjugation_type_id: number
}

export interface ConjugationGroup {
  _id: number,
  group: string,
  description: string
}

export interface ConjugationType {
  _id: number,
  type: string,
  description: string,
  conjugation_group_id: number,
  sequence: number
}

export interface Pronoun {
  _id: number,
  pronoun: string
}

export interface Verb {
  _id: number;
  english: string;
  italian: string;
}

