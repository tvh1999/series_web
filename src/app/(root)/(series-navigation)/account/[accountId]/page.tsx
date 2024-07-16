import { getClerkUserAccountInfo } from "@/lib/actions/users.action";
import { getTimeSince } from "@/lib/utils";
import Image from "next/image";
import StatCard from "@/components/shared/StatCard/StatCard";
import AccountTabs from "@/components/shared/AccountTabs/AccountTabs";
import Link from "next/link";

interface AccountProps {
  params: { accountId: string };
}

const AccountPage = async ({ params }: AccountProps) => {
  const { totalBookmarks, totalReviews, userInfo } =
    (await getClerkUserAccountInfo({
      userId: params.accountId,
    })) as {
      totalBookmarks: number;
      totalReviews: number;
      userInfo: { [key: string]: any };
    };
  // console.log({ totalBookmarks, totalReviews, userInfo });
  const badgesArray = [
    { imgUrl: "/assets/gold-medal.svg", value: 0, title: "Gold badge" },
    { imgUrl: "/assets/silver-medal.svg", value: 0, title: "Silver badge" },
    { imgUrl: "/assets/bronze-medal.svg", value: 0, title: "Bronze badge" },
  ];
  return (
    <>
      <div className="flex justify-start gap-x-80">
        <div className="flex gap-x-3">
          <div className="max-h-36 w-36 max-w-full">
            <Image
              src={userInfo?.profileImage}
              width={100}
              height={100}
              alt={`profile image of ${userInfo?.name}`}
              layout="responsive"
              className="size-auto rounded-full object-contain"
            />
          </div>
          <div>
            <h3 className="primary-font-color-pureWhite-pureBlack text-25 font-bold">
              {userInfo.name}
            </h3>
            <p className="primary-font-color-pureWhite-pureBlack mb-2">
              @{userInfo.username}
            </p>
            <div className="flex">
              <Image
                src={"/assets/calendar.svg"}
                width={20}
                height={20}
                alt="joined date icon"
                className="mr-1 size-auto object-contain"
              />
              <p className="primary-font-color-pureWhite-pureBlack">
                {getTimeSince(userInfo.createdOn)}
              </p>
            </div>
          </div>
        </div>
        <Link
          href={`/account/edit/${userInfo._id}`}
          className="primary-font-color-pureWhite-pureBlack flex max-h-12 items-center justify-center rounded-lg border px-8 text-18"
        >
          <span>Edit Profile</span>
        </Link>
      </div>
      <div className="mt-8 flex justify-start gap-x-4">
        <h2 className="mt-5 text-28 font-bold">Stats</h2>
        <div className="max-h-fit w-fit max-w-full rounded-md border px-7 py-10">
          <StatCard
            value={totalReviews}
            title="Reviews"
            designatedClasses="mb-10"
          />
          <StatCard value={totalBookmarks} title="Bookmarks" />
        </div>
        {badgesArray.map((badge: any) => (
          <div
            key={badge.title}
            className="max-h-fit w-fit max-w-full rounded-md border px-7 py-10"
          >
            <Image
              src={badge.imgUrl}
              width={40}
              height={54}
              alt={badge.title}
              className="size-auto object-contain"
            />
            <StatCard
              value={badge.value}
              title={badge.title}
              designatedClasses="mt-3"
            />
          </div>
        ))}
      </div>
      <AccountTabs userId={userInfo._id} />
    </>
  );
};

export default AccountPage;
