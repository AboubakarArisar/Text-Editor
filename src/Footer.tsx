const Footer = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <footer className='p-8 w-[90%] h-[20vh] border-t-2 flex justify-center items-center'>
          <div className='w-full  flex justify-between items-center '>
            <div>
              <p className='text-gray-600'>
                &copy; 2024 DocEditor Inc. All rights reserved.
              </p>
            </div>
            <div>
              <ul className='flex items-center gap-4'>
                <li>
                  <a href='#' className='text-gray-600 hover:text-gray-800'>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-600 hover:text-gray-800'>
                    Terms
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-600 hover:text-gray-800'>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-600 hover:text-gray-800'>
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
