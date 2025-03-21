import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { errorRoute } from "./layouts/error/error.route"
import { navbarRoute } from "./layouts/navbar/navbar.route"
import { DEBUG_INFO_ENABLED } from "app/app.constants"
import { Authority } from "app/config/authority.constants"
import { UserRouteAccessService } from "app/core/auth/user-route-access.service"
import { DashboardComponent } from "./dashboard/dashboard.component"

const routes: Routes = [
  {
    path: "admin",
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import("./admin/admin-routing.module").then((m) => m.AdminRoutingModule),
  },
  {
    path: "account",
    loadChildren: () => import("./account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
        data: {
      authorities: [Authority.ADMIN, Authority.USER],
    },
    canActivate: [UserRouteAccessService],
},
  {
    path: "",
    loadChildren: () => import("./entities/entity-routing.module").then((m) => m.EntityRoutingModule).catch(() => {
      console.error("Module not found: './entities/entity-routing.module'");
      return null;
    }),
  },
  navbarRoute,
  ...errorRoute,
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: DEBUG_INFO_ENABLED })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

