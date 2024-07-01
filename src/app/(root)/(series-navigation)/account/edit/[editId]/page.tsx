import React from "react";
import AccountEditForm from "@/components/shared/EditForm/AccountEditForm";
import { getUserAccountInfo } from "@/lib/actions/users.action";

interface EditPageProps {
  params: { editId: string };
}

const EditPage = async ({ params }: EditPageProps) => {
  const userInfo = await getUserAccountInfo({ userId: params.editId });
  return (
    <div>
      <AccountEditForm accountInfo={userInfo!} />
    </div>
  );
};

export default EditPage;
