import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag} from "react-icons/hi";
import { ImBooks } from "react-icons/im";



import userImg from "../assets/demo.png"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { FaCartArrowDown } from "react-icons/fa6";

const SideBar = () => {
    const { user } = useContext(AuthContext)
    console.log(user);

    return (
        <div>
            <Sidebar aria-label="Sidebar with content separator example">
                <Sidebar.Logo className="w-16 h-16" href="/" img={user?.photoURL || userImg} imgAlt="logo">
                    <p>
                        {
                            user?.displayName || "abc"
                        }
                    </p>
                </Sidebar.Logo>

                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin/dashboard" icon={FaCartArrowDown}>
                             Cart
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/dashboard/all-books" icon={ImBooks }>
                            All Books
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
                            Upload Book
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
                            Manage Books
                        </Sidebar.Item>

                        <Sidebar.Item href="/logout" icon={HiArrowSmRight}>
                            Log Out
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar