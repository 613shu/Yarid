import { useCustomers } from "../hooks/useCustomers";
import type { customerType } from "../typs/gameTyps";
import { Customer } from "./Customer";

/* כל הלקוחות — מרונדרים בתוך עולם התלת-ממד */
export const CustomersLayout = () => {
    const { customers } = useCustomers();

    return (
        <group>
            {customers.map((c: customerType) => (
                <Customer customer={c} key={c.id} />
            ))}
        </group>
    );
};
