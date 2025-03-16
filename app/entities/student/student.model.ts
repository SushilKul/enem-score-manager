import type { IScoreTarget } from "app/entities/score-target/score-target.model"

export interface IStudent {
  id?: number
  name?: string
  email?: string
  registrationNumber?: string
  enrollmentDate?: Date | null
  scoreTargets?: IScoreTarget[] | null
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public registrationNumber?: string,
    public enrollmentDate?: Date | null,
    public scoreTargets?: IScoreTarget[] | null,
  ) {}
}

