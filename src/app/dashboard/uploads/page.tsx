import UploadsPage from "~/ui/components/pages/dashboard/uploads-page";

export default function Page() {
  return (
    <div
      className={`
        mx-4 mt-8 space-y-6
        md:mx-16
        lg:mx-32
      `}
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Upload New Media</h2>
        <UploadsPage />
      </section>
    </div>
  );
}
