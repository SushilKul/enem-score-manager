export enum ExamArea {
  LINGUAGENS = "LINGUAGENS",
  HUMANAS = "HUMANAS",
  NATUREZA = "NATUREZA",
  MATEMATICA = "MATEMATICA",
}

export interface IExamAreaTarget {
  id?: number
  area?: ExamArea
}

export class ExamAreaTarget implements IExamAreaTarget {
  constructor(
    public id?: number,
    public area?: ExamArea,
  ) {}
}

