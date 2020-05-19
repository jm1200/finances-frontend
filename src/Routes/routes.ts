import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ImportFile from "../pages/ImportFile";
import Settings from "../pages/Settings";
import { Transactions } from "../pages/Transactions";
import { CategoriesTotals } from "../pages/CategoriesTotals";
import { CashFlowAnalysis } from "../pages/CashFlowAnalysis";
import { Budget } from "../pages/Budget";
import { Summary } from "../pages/Summary";
import { EditCategories } from "../pages/EditCategories";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface IRoute {
  name: string;
  path: string;
  component: React.FC<any>;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

interface IRoutes {
  publicRoutes: IRoute[];
  loggedInRoutes: IRoute[];
  loggedOutRoutes: IRoute[];
}

export const routes: IRoutes = {
  //Routes that are always visible
  publicRoutes: [
    {
      name: "Home",
      path: "/home",
      component: Home,
      icon: InboxIcon,
    },
  ],

  //Routes only visible when logged in
  loggedInRoutes: [
    {
      name: "Logout",
      path: "/logout",
      component: Logout,
      icon: InboxIcon,
    },
    {
      name: "ImportFile",
      path: "/importFile",
      component: ImportFile,
      icon: InboxIcon,
    },
    {
      name: "Transactions",
      path: "/transactions",
      component: Transactions,
      icon: InboxIcon,
    },

    {
      name: "EditCategories",
      path: "/edit-categories",
      component: EditCategories,
      icon: InboxIcon,
    },
    {
      name: "CategoriesTotals",
      path: "/categories-totals",
      component: CategoriesTotals,
      icon: InboxIcon,
    },
    {
      name: "CashFlowAnalysis",
      path: "/cash-flow-analysis",
      component: CashFlowAnalysis,
      icon: InboxIcon,
    },
    {
      name: "Summary",
      path: "/summary",
      component: Summary,
      icon: InboxIcon,
    },
    {
      name: "Budget",
      path: "/budget",
      component: Budget,
      icon: InboxIcon,
    },
    {
      name: "Settings",
      path: "/settings",
      component: Settings,
      icon: SettingsIcon,
    },
  ],

  //Routes only visible when not logged in
  loggedOutRoutes: [
    {
      name: "Login",
      path: "/login",
      component: Login,
      icon: InboxIcon,
    },
    {
      name: "Register",
      path: "/register",
      component: Register,
      icon: InboxIcon,
    },
  ],
};
