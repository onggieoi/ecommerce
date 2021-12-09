import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Modal } from "@redq/reuse-modal";
import { ProfileProvider } from "contexts/profile/profile.provider";
import SettingsContent from "containers/Profile/Settings/Settings";
import {
  PageWrapper,
  SidebarSection,
  ContentBox
} from "containers/Profile/Profile.style";
import Sidebar from "containers/Profile/Sidebar/Sidebar";
import SiteFooter from "components/SiteFooter/SiteFooter";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "helper/hooks";
import { getMe } from "redux/account/accountReducer";
import InlineLoader from "components/InlineLoader";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { me, loading } = useAppSelector(state => state.accountReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (loading && !me) {
    return <div>loading...</div>;
  }

  // if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Profile - SNKR</title>
      </Head>
      {loading && <InlineLoader />}

      <ProfileProvider initData={me}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              {me && (<SettingsContent deviceType={deviceType} />)}
            </ContentBox>

            <SiteFooter style={{ marginTop: 50 }}>
              SNKR &nbsp; <Link href="https://www.instagram.com/onggieoi/">onggieoi, Inc.</Link>
            </SiteFooter>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;