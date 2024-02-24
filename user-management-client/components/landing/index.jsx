import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold"> پروژه مدیریت کاربر!</h1>
      </header>

      <main className="container mx-auto py-8">
        <p className="text-lg">
          این پروژه فول استک و ریسپانسیو(بهینه شده برای صفحات موبایل، تبلت و
          دسکتاپ) برای مدیریت ثبت نام کاربر و ورود با ایمیل و رمز عبور کاربر بعد
          از ثبت نام طراحی و ایجاد شده است.
        </p>
        <p className="text-lg">
          رابط کاربری این پروژه با Next JS و Tailwind CSS توسعه داده شده است.
        </p>
        <p className="text-lg">
          سمت سرور این پروژه با Node JS و فریمورک Express توسعه داده شده است.
        </p>
        <p className="text-lg">
          برای ذخیره سازی داده ها از پایگاه داده MONGO DB استفاده شده است.
        </p>
        <p className="text-lg">
          برای ثبت نام کاربر از پکیج jwt در سمت سرور استفاده شده است.
        </p>

        <div className="flex justify-center items-center gap-1 p-2 m-4">
          <p className="text-lg font-bold">
            برای ورود و یا ثبت نام می توانید از اینجا شروع کنید
          </p>

          <Link
            href={"/login"}
            className="bg-[#332941] hover:bg-[#FFB000] text-white font-bold py-2 px-4 rounded"
          >
            شروع
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
