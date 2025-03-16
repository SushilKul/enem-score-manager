import type { IStudent } from "app/entities/student/student.model"
import type { IExamAreaTarget } from "app/entities/exam-area-target/exam-area-target.model"

export interface IScoreTarget {
  id?: number
  targetValue?: number
  creationDate?: Date | null
  lastModifiedDate?: Date | null
  student?: IStudent
  examArea?: IExamAreaTarget | null
}

export class ScoreTarget implements IScoreTarget {
  constructor(
    public id?: number,
    public targetValue?: number,
    public creationDate?: Date | null,
    public lastModifiedDate?: Date | null,
    public student?: IStudent,
    public examArea?: IExamAreaTarget | null,
  ) {}
}

