import { useCustomers } from "../hooks/useCustomers";
import type { customerType } from "../typs/gameTyps";
import { Customer } from "./Models/Customer";

export const CustomersLayout = () => {
    const { customers } = useCustomers();

    return (
        <group>
            {customers.map((c: customerType) => (
                <Customer customer={c} key={c.id}
                
                 />
            ))}
        </group>
    );
};
