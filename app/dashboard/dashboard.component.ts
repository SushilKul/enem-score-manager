import { Component, type OnInit } from "@angular/core"
import type { HttpResponse } from "@angular/common/http"
import type { IStudent } from "app/entities/student/student.model"
import type { StudentService } from "app/entities/student/service/student.service"
import type { IScoreTarget } from "app/entities/score-target/score-target.model"
import type { ScoreTargetService } from "app/entities/score-target/service/score-target.service"
import { ExamArea } from "app/entities/exam-area-target/exam-area-target.model"

@Component({
  selector: "jhi-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  students: IStudent[] = []
  scoreTargets: IScoreTarget[] = []
  loading = true

  // Statistics
  totalStudents = 0
  averageTargets: Map<ExamArea, number> = new Map()

  constructor(
    protected studentService: StudentService,
    protected scoreTargetService: ScoreTargetService,
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.studentService.query().subscribe(
      (res: HttpResponse<IStudent[]>) => {
        this.students = res.body ?? []
        this.totalStudents = this.students.length
        this.loadScoreTargets()
      },
      () => {
        this.loading = false
      },
    )
  }

  loadScoreTargets(): void {
    this.scoreTargetService.query().subscribe(
      (res: HttpResponse<IScoreTarget[]>) => {
        this.scoreTargets = res.body ?? []
        this.calculateStatistics()
        this.loading = false
      },
      () => {
        this.loading = false
      },
    )
  }

  calculateStatistics(): void {
    // Initialize counters for each exam area
    const totals = new Map<ExamArea, { sum: number; count: number }>()

    Object.values(ExamArea).forEach((area) => {
      totals.set(area, { sum: 0, count: 0 })
    })

    // Calculate sums and counts
    this.scoreTargets.forEach((target) => {
      if (target.examArea?.area) {
        const area = target.examArea.area
        const current = totals.get(area)
        if (current && target.targetValue) {
          current.sum += target.targetValue
          current.count += 1
          totals.set(area, current)
        }
      }
    })

    // Calculate averages
    totals.forEach((value, key) => {
      this.averageTargets.set(key, value.count > 0 ? value.sum / value.count : 0)
    })
  }

  getExamAreaLabel(area: ExamArea): string {
    switch (area) {
      case ExamArea.LINGUAGENS:
        return "Linguagens, Códigos e suas Tecnologias"
      case ExamArea.HUMANAS:
        return "Ciências Humanas e suas Tecnologias"
      case ExamArea.NATUREZA:
        return "Ciências da Natureza e suas Tecnologias"
      case ExamArea.MATEMATICA:
        return "Matemática e suas Tecnologias"
      default:
        return "Unknown"
    }
  }
}

