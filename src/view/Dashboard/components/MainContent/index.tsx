import Header from "./components/Header";
import PreviewImage from "./components/PreviewImage/PreviewImage";
import GeneratorForm from "./components/GeneratorForm";
import useGetValues from "./hooks/useGetValues";

const MainContent = () => {
  useGetValues();
  return (
    <>
      <div>
        <div className="h-[8svh] px-5">
          <Header />
        </div>
        <div className="flex w-screen justify-center gap-5 lg:pl-10 pl-5 ">
          <GeneratorForm />

          <PreviewImage />
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MainContent;
