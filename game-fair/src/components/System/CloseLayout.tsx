import { Outlet, useNavigate } from "react-router"

export const CloseLayout = () => {
    const navigate = useNavigate();

    return<>
  <div className="pointer-events-auto fair-glass fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto p-6 pt-16">
    <button
        onClick={() => navigate("/game")}
        className="fair-btn fair-btn-wood fixed top-20 left-6 z-50 grid h-10 w-10 place-items-center rounded-full p-0 text-lg leading-none"
        aria-label="סגירה"
    >
        ✕
    </button>
    <Outlet />
</div>
</>
}