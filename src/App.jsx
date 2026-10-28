import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import CreateOpportunity from "./pages/CreateOpportunity";
import OpportunityDrafts from "./pages/OpportunityDrafts";
import ProgramApplications from "./pages/ProgramApplications";
import ApplicationReview from "./pages/ApplicationReview";
import Farmers from "./pages/Farmers";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/PersonalInformation";
import OrganizationalDetails from "./pages/OrganizationalDetails";
import PreferenceSelection from "./pages/PreferenceSelection";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
// import AIAdvisor from "../pages/AIAdvisor";
// import Products from "../pages/Products";
// import Wallet from "../pages/Wallet";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="programs"
          element={<Programs />}
        />
        <Route
          path="programs/create"
          element={<CreateOpportunity />}
        />
        <Route
          path="programs/drafts"
          element={<OpportunityDrafts />}
        />
        <Route
          path="programs/:programId/applications"
          element={<ProgramApplications />}
        />
        <Route
          path="programs/:programId/applications/:applicationId"
          element={<ApplicationReview />}
        />
        <Route
          path="farmers"
          element={<Farmers />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
        <Route
          path="settings/personal-information"
          element={<PersonalInformation />}
        />
        <Route
          path="settings/organization"
          element={<OrganizationalDetails />}
        />
        <Route
          path="settings/language"
          element={<PreferenceSelection preference="language" />}
        />
        <Route
          path="settings/currency"
          element={<PreferenceSelection preference="currency" />}
        />
        <Route
          path="settings/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="settings/contact"
          element={<ContactUs />}
        />
        {/* <Route
          path="ai-advisor"
          element={<AIAdvisor />}
        />
        <Route
          path="products"
          element={<Products />}
        />
        <Route
          path="wallet"
          element={<Wallet />}
        /> */}
      </Route>
    </Routes>
  );
}
