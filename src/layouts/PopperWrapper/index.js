function PopperWrapper({ children }) {
    return (
        <div className="flex flex-col items-start justify-center min-w-[175px] bg-white rounded-[0.25rem] py-[0.5rem] border-solid border-[#dee2e6] overflow-hidden border-[1px]">
            {children}
        </div>
    );
}

export default PopperWrapper;
