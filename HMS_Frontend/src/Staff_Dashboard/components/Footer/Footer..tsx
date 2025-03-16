function Footer() {
  return (
    <>
      <footer className="bg-white  dark:bg-boxdark dark:border dark:border-slate-500 dark:text-white rounded-sm shadow py-2 dark:bg-gray-800 sticky flex flex-col align-middle justify-center">
        <div className="w-96 mx-auto max-w-screen-xl p-4 md:flex md:items-center ">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{' '}
            <p className="inline font-semibold">Fahad Zafar</p>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
