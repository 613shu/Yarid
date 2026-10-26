import { useCustomers } from "../hooks/useCustomers";
import type { customerType } from "../typs/gameTyps";
import { Customer } from "./Customer";

export const CustomersLayout = () => {
    const { customers } = useCustomers();

    return (
        <main className="relative w-full h-[80vh] overflow-hidden">
            {customers.map((c: customerType) => (
                <Customer customer={c} key={c.id} />
            ))}
        </main>
    );
};