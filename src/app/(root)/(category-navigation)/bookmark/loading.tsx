import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-4 sm:px-[25px] lg:px-0">
      <Skeleton className="my-6 min-h-6 w-full max-w-full lg:min-h-10 lg:w-2/3" />
      <Skeleton className="my-10 min-h-[140px] w-full max-w-full sm:min-h-56 lg:min-h-[230px]" />
      <section className="grid max-w-full grid-cols-2 gap-x-[15px] gap-y-4 sm:grid-cols-3 sm:gap-x-[30px] sm:gap-y-6 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="min-h-[154px] w-[164px] max-w-full sm:min-h-48 sm:w-[220px] lg:min-h-[226px] lg:w-[280px]"
          >
            <Skeleton className="min-h-[110px] w-full max-w-full sm:min-h-[140px] lg:min-h-[174px]" />
            <Skeleton className="mt-3 min-h-11 w-36 max-w-full" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Loading;
