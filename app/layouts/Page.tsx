import { Outlet } from "react-router";
import PageContainer from "~/containers/PageContainer";

const Page = () => {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default Page;
