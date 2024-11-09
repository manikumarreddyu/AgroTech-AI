import { useState } from "react";
import ReturnHeader from "./components/ReturnHeader";
import ReturnFilter from "./components/ReturnFilter";
import ReturnProductCard from "./components/ReturnProductCard";
import ReturnModal from "./components/ReturnModal";
import ReturnHistory from "./components/ReturnHistory";

export default function ReturnPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [condition, setCondition] = useState("Good");
  const [comment, setComment] = useState("");
  const [filter, setFilter] = useState("All");
  const [history, setHistory] = useState([]);
  const [sortOption, setSortOption] = useState("Name");

  const handleReturn = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, status: "Pending" } : p
    );
    setProducts(updatedProducts);
    setIsModalOpen(false);
    setSelectedProduct(null);
    setReturnDate("");
    setCondition("Good");
    setComment("");
    setHistory([
      ...history,
      { ...selectedProduct, returnDate: new Date().toLocaleString(), comment }
    ]);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedProducts = [...products].sort((a, b) => {
      if (option === "Name") return a.name.localeCompare(b.name);
      if (option === "Start Date") return new Date(a.startDate) - new Date(b.startDate);
      if (option === "End Date") return new Date(a.endDate) - new Date(b.endDate);
      return 0;
    });
    setProducts(sortedProducts);
  };

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-green-50">
      <ReturnHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-green-800">
            Return Rented Equipment
          </h2>
          <ReturnFilter filter={filter} setFilter={setFilter} />
        </div>
        <div className="mb-6">
          <label htmlFor="sort" className="mr-4 text-green-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Name">Name</option>
            <option value="Start Date">Start Date</option>
            <option value="End Date">End Date</option>
          </select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ReturnProductCard
              key={product.id}
              product={product}
              handleReturn={handleReturn}
            />
          ))}
        </div>
        <ReturnHistory history={history} />
      </main>
      <ReturnModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        handleSubmitReturn={handleSubmitReturn}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        condition={condition}
        setCondition={setCondition}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}


const dummyProducts = [
  {
    id: 1,
    name: "Tractor",
    model: "John Deere 5075E",
    startDate: "2023-05-01",
    endDate: "2023-05-31",
    status: "Eligible",
    image: "https://www.tafetribe.com/pub/media/catalog/product/cache/343ef2803f1a27d8d77b5e62acabb37c/m/f/mf-dynatrak_toy_tractor.jpg",
  },
  {
    id: 2,
    name: "Harvester",
    model: "Case IH 250",
    startDate: "2023-04-15",
    endDate: "2023-05-15",
    status: "Pending",
    image: "https://s3.toolsvilla.com/products-minipetrolharvester/1708773710976/1708773724856-watmrkA.webp",
  },
  {
    id: 3,
    name: "Seeder",
    model: "Kinze 3600",
    startDate: "2023-05-10",
    endDate: "2023-06-10",
    status: "Eligible",
    image: "https://pre-live-admin.balwaan.com/uploads/media/2023/1_(4)1.jpg",
  },
  {
    id: 4,
    name: "Sprayer",
    model: "John Deere R4045",
    startDate: "2023-03-01",
    endDate: "2023-04-01",
    status: "Returned",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWYzHIpFSFN_mUgVWV_Ubc1Id1AaUifhlwg&s",
  },
  {
    id: 5,
    name: "Plow",
    model: "Kuhn Multi-Leader",
    startDate: "2023-05-05",
    endDate: "2023-06-05",
    status: "Eligible",
    image: "https://www.shutterstock.com/image-photo/hand-plow-on-field-plowing-600nw-1075430750.jpg",
  },
  {
    id: 6,
    name: "Cultivator",
    model: "Case IH Tiger-Mate 255",
    startDate: "2023-04-20",
    endDate: "2023-05-20",
    status: "Eligible",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw0NDw0NDw0PDw0PDg0ODQ8ODg8OFxEWFhUVFRMYHigsGholHhUWITEjJSorLi4uGSAzOT8sNygtMCsBCgoKDg0OGhAQGi0lICYtLS0rKy8tLy0wKystLS0tKystLS0tLS0tKy0tLS0tLy0tLS0tLS0tLS8tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEBAQADAQEBAAAAAAAAAAAAAQIFBgcEAwj/xAA/EAACAgIABAMGAwYEBAcBAAABAgADBBEFEiExBhNBByJRYXGBIzKRFEJigqGxUnKi0RUkM7JDY3ODweHwF//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAyEQEAAgIBAgMGBQQCAwAAAAAAAQIDEQQSITFBUQUTYXGRsSIyQoHRI6Hh8FLBFCQz/9oADAMBAAIRAxEAPwD2CEEBAQEBAQEBAQECwGoDUBqA1AQJAQEBAQEBAQEBAQEBAQEBAQEBAQLqBdQk1AuoDUBqA1AagNQJqA1AmoQkBAQEBAQEBAQEBAQEBAQLAuoSsBqBdQLqA1AagNQGoDUCagTUBAmoE1CEgICAgICAgICAgICBQIFAhK6gXUDWoDUC6gNQLqAgTUBqA1AmoE1AzqBNQIRAkIICAgICAgICAgUCBoCErqBQIGtQEC6gWAgICAgIE1AQJqBkiBNQJAyRAkIICAgICAgIFAgaEJUQNAQLAsCwEBAQEBAQEBAQJAkCEQMmBDAyRAkIICAgICBRAohLQgaAgWBYHU/HPG78V8Sum+rHW4ZDPbZWLNlFBVBvoCxPLv5ic+bJNZiIejweNTLW02rM614fHz/ZrwP4iyM03i8Yvu1Yt1Zxyx5Vt5/cs2fzryddeplsWSb+KnM49MWunfjMd/h5/J2ubOFYCA1AagICBICAgIEgZIgZMDJgQwhICAgICBoQlRA0IGhAsCwPPvao9a2cONlZsUjLUKrFCHKoEbY78rEHXrqcfKmNxuPV7XsmLTW/TOp7f5fL7IPK83OFXmf9DB83zOX/AK27efl1+7vt6xxdd9fA9rdXTXq9Z18u2npk7HirAQEBAQECQECQEBAzAhEDJgZMDMIICAgUQNQlRA2IFgWAgeZ+1zLVLsBAOdyCTXvelLjRA+JI189CcXK7zEPc9kzNa2ny2634F8RHhuTabKS1F/LXayn8RCpYqyj1/Mdj/brlhyxSXZzeHbkUjXjHh8XteBm1X1rdTYtlbdmU7H0PwPyM9GtotG4fNZMdsdum0al9ElQgICAgIEgIEgSAgQwIYGTAyYGTCEgICBRCWhA0IH5Pm0qSrXVKy9GUuoIOt9R9CJXqj1XrivaNxE/R+bcXxR3yaB9bU/3jrr6tI42af0z9H5P4gwh3zMYf+8kj3tPVaOHnn9E/R+R8U8PHT9ux/oLAT/SV99j9YWjg8j/hLoHhpDxfjl2c4JxsQh0B7bBK0r+oL/yzDF+O82l6HJmONxoxx4z/ALP8OP8AHXCv2fKvRQOV/wAaoemm2dfrzD7Tkz06Mvwer7PzTm40esdvo+HwXxq6q8eRbyM2g9LkclnUDqD3A3vY66E1xRatu0seZGLLj/HHePrD17g3iCrIPltqu8Eryb2jsO/I3qfl3HXv3nfF43qXzuXjzWOqO8OZl3OsBAkBAQECQJAkBAhgZMDJgZMIZgIAQNCEtCBm/ISteax0RdgczsFGz2Gz6yJmI8Vq0tadVjbpfE8DhuTxCx8nktqahGDrdYq13AhSrchHUqAevwnFOPHOaZnvExH1exivysXGjo3E79PGC3hnhur864y/+pbkH+5mvRhjyhn7/wBoT5y/D9o8Kr68PP2d/wC8nWH0Rvnz5z9XC+LuJ8EXEb/h1GI2Szqgtro5WqHcsGI79JllnH06rDp4teV17y2nXz8Zdh9l+Th4+DXX5qjItZ7btjfvdlGxsABQvfXrNMF6RXW3P7QwZrZOrXaPB9XtHwVuxkyqyrGhtMVIb8Junp8Dr9TM+ZTqp1R5NPY+aceacdv1fd5t4ZzcfFzlXLpptxLyqv5tauKyT7tikjpyt316E/ATHj3jt1eD0faGC0xM0mYmO8a8/WHqHGPDDKOfFO03s0n3yB68hJ6/HRO9gdT2nfNe3Z4OLkxv8fj6/wAs8F8SOjGrIDtUuh5rA+ZWeu1Yd21rRPf676K2n9ls3HiY3Xx9HbqbFdQ6MGVhsMpBBH1mjhmJidS3qEECQJAQJAkBAkCGBDAwYGTAyYQQKIGhCWhA4zxLwpsvGehGVXLIylt8uwex1Ms+P3lJq6OJnjDli8w8lue7HYpattJD+Xq5GVC+ubQLDR6Hc8ucd6d301M+PJ2rK+ajd05eu+al2rJ+w6SOv1bxGn5Pgq/5cheu/dyalb/Vo/2iJ+K0zXzq4VsZrbxVXWjCvZZakCox/e/Lrp0A+01jemU9PV8H21XVK3KaFDr01XkOrA/ctM9fBt4+Fv7Q5fGzHIKrVnkFSpGlydqe42UU66fGXiZnt3YXisTuZr9v+5cfl8Ma4PjiuzzxtqkFZNhcDZQrrYBG/pqZ4e1pq1z2iccZN9vXbvfsz8ZrbjDDyG/5jGXlVmbRsoH5Ts+q/lPX0B9TPTxZNxqXzvN4cxbrp4T93ZcijEz151YV3jXvKVZ1I7BwpII7eu/gRNO1nNHvMPjG4dT4lxPN4VaGVVehmAIBLUWEb5tsPyt2AHccvqO/Ply3xzuHo8fjYeVXW9T/AHdy8OeJsbPX8JuW4Db47kCxfmP8S/Mf0m2LNXJHZ53K4WTjz+KO3lPk5qauQgSBICBIEgSAgZMDJgZMDJgSEKIS0IGhA0IGbqUccrojr35XUMu/oYTEzHg8D8cB6OI5ldbcgFpYKmggDe+Br6MJ5t6xFrRL6fj2m2Gkx6Oxt4YvTDpzy3m1vjVXuoCo9bMoY8wPdRvXTZi/H1XqhTF7Qi2WcVvHevm6xwQ31M1lCpYSRzAP740T+7zLzd+0pWdy7L605vD8XZVB5bKqddjWaXx2C/wkaIl/fXpPhDOeJiy1/NO2l4hTkD8TO4viWkseYZN2Rj9T0HLzc3T5RGWtvGZhS3Htj/LWto+Wp/hx+XjFAVOSMge8BkKTtgevXZJB6kdfhOfLHTbcTt28a3VWazXXwdeXh+QHSs49o81lFdllTLUeY6Dc5GuXrvfpOjo6oiXJPIilpiPJz7+HcjFqW9srBWzQY0VZqHIrPw0OhI/hJ+W5W+Lp7xMfVbDy4yT0zS2vWY7MUeIMgDyjYt1YJJpuAtQk+pHc/rKRkvEd/BvODDa247T6x4vnTJZbBbXuplPMhrZgUP8ACd7/AKzPffcdm80ia9N+8ee3fuBe0K5gtOQaFs6AZNnMtbf5woOj8x0+k7cXKme1vq8PleyK13fFuY9P4d44Zxiq2utmtq53dq15SVV3BOgobqegnXW8THi8fLx70tMant3clLucgSBIEMCGAgQwMGBkwMmBIQohLQgaEDYgWB5R/wANozfElyW6spH4vKDtXZKk0rfEb7j5anFFYtmnb3JyWx8Gsx4/zMvVbqUdWrdFdGGmRlDKw+BB9J2TES8SJmJ3E93m3tewKaMXFeimulvOZfwa1q2Cu+vKOv5R/Wc2esRp6vs69rWvud9o+7jfZvwbI4hRk2X3sKUdK6C9aWo1gBNm0YdQAU6gjruRTFFoa8nmTitER39Xw8Pxly8jKxasaw247Xcz0MoV0Szk5wjn12DoHfWZWwTvWvo6MfPrNIvM68u/8w+TOxBX5gFo2uw6MjV3IR33Wfp8Zz3pp6GLN1d4ftw3xRfRWtHm3vUQVFNuNW9RU+i8zb/SaUyzWNb7Ms3Epkv1dPf13MS+y/J4PyVJlYb13t058SwLb82ZCdfc7l65Mcx3r+7G+DkVt+DJHfyko4DwazznF9pFYU1o7mu634gL6kfIS1bYp3qWV45VZrusb/tD4eKNRR+GOE5lgTYDtl1Fdd/eaqsk/cykxi3rxn/fRvS3I11dURHy/l1xuMLs8uNWOvY22OB8u4mfu4dPv7RD6cTxflUa8inApYdrBi81n3ZmM6Kar4Q4c0WyTPXadem+zs3hn2g5Zdkzby9b65bFrStqT22OQDa/Huf7GffzE9/BnPApNd08Y8vV2rO8VZOIFfrfjaH44C3Dr2LEcvQ76Hf/ANzbNevyZ04OHL28J9PB9vD/AGgY9hUOFG+7Bwmj8OV9f0Jlq8qs+LHJ7IyRG6y7Dh8bxrRtbQOutWA19flzd/tNq5az5uDJxctPGPp3ftfxChPz5FKf5rUX+5kzkrHjKlcOS35az9HHX+KuHp+bNo/lYv8A9u5nPJxR+qG9fZ/Jn9E/b7uMyfaJw1O1tj/5KyP+7UrPLx+W/o3r7J5E+Oo/dyvhzxBRxCp7qOflSw1urgAhtA+nyIM1x5IvG4cnJ41sFum0xPycoZo52DAyYEhCiEtCBoQNiBRA8f8AZkTbxjJtHVFXNfm9OV7Ry/rzTmius0vTvl6uFET66ewidLzHmvtsykFGLRv8Xne4DXTkC8pO/qRObkz2h6vsqPxWn4R93OcR4pRwfhNK1hUfyFGPUD1NjKCznfcAsWJ+P1nRSI087Ja17zM+O3y+yfgDY+M+ZaPx8zRCn8yULvlDfxEkk/YdxIjvM2Wy21EY48vH5+bzrx3zLxbNWtOZnt8tUALMzOB0A9SS3QfOcOSu7zHxe/xrzXBS3wft4y4XZw+nh2J5tzZd1TWZNPnBlSwlRWqaA6b5x131E1tx6xXbkx+0b3zdPl3/AGdo/wD46AUdOIMG1+KLMYWbb+Eh10PruWnjxMa2yp7TmttzV0/jVK4V9mLYysa2K+YqnlYgD09O84bYtWmIe5i5PXSt5jW368K409RDY9/KRogDRA/lb/aVib0nsteuPNGp7uXr45TY7vnYGPll2BNh2li6/wAJ9B8hrc1ryP8AnG3Lk4M6iMVpq/PifDOE3hrcZnxrzy6x7aKmq+HunYCj6mXm+O35ZmPgpTHnpMRkrFo9e+/9/Z+OP4NymyacY5VTYnvXNZiA2oEA0W8oAAsdBfXuJaMW51tW/LiK9da6nw76h9ODxUYd1uGzm3E2VHm0tRYqnufKsAOuvUdvh8DSLTjnU+DeaRyK9cRq0eOp39nx8a4LXS621WI1NgLqm98v0PqvWZZaxXvEujj5bXia2jwde/4nZaxFd50SeVF2ToDvr7biaajvBXJW3atoY5GPU2ufpoTPdfRv0Wn9TksDHwSR51eU/wAQbSyn7pykTWuSvowyYLzH4bOU4xiYBoVMPh6pYWBe9rrrCFHoBYdgk69O31l75ImNVju58HHvXJNsttx6a/h6J4OuwMbGqw6b0DqfxOcGprL20WIDd9kgDW+mhO3FakVisS8PmYs1rzktXt5fJ2YzZwMGBkwJCFEDQhLQgaEDq/tB8RLh4r1od5V68laDZYKx5S2h69dAepIlojzNb7Q+b2X+HjiYrX2qVyspt2IylWqRSQtZB9e5P1HwmVY7zafN0ZrxqMdfCPv5y7oJdzvHPbGTdxHDx6/ec0pTyb/8WyxuUfU+7+omOau6u3gZOjJPy+z0XE8J0LZXfe9mTfX5flvYdJWVGhyoOmvrv5am3lpxzPeZh2EQh4twfjuK3iHOzbRqmk5vKXUFg9YFe1HxOm16+9OatdZnqXy74cRHl2+77vCnDb+McWbjGTS64dbFsckDy3esgVoNnZC/mJA0WUj4ib2jcuKtvd0n1nt8oeuyzB4D7Uq1XimUqjQ/DY9z77VqzH9TPPyREZJfR8OZnjV38fuvss4OMriDq4byq8e82EHWi6+UBv4nmb9DNqY99pcnIz9NZtX1jX7eLuXEPZe464ud3sclMmvmUVkDlUFfUdfrv011i3ErPgjH7WvH5o+jhPEnhPIwK0ussqtrZghavmRg5Un8renunruc2Xjzj77enxPaFeRPTrU+LgMTiJQhqryjHsa7CpP6HrMY66+Dsn3eTtOpc7V4syCvl5CUZVf+HIpRj+uv7gzWOTfwt3+bmn2fj3ukzWfhLjrOL41JpJotOizMgKKpOydDXQDZHTl9JWurTEtbzatJrvx8P8vwwb6Xc342DVW6PzK3MSyN3BUbGvt8J1VrN+8PMy3ri/DZ9eU91jF7WpVi2mfl9/6ktvf6yZ48T3mVK8+ax00js+G1z5ZYXczdPdU66bGz7vf16R7mkQn/AMvNNteTNuXjL0awt17OwHTfqDr/APa+cv044Yzk5E+b5vCWK2VxTESvTlMim5jzKPwq3VmYb79B2HWZ1ru7fLkimGdz5af0IZ2vBZMDJgSEKIGhCWhA+fNXIbS0vVWCPetcNY6/5a+gP1J+xgfBh+GcdLP2i0Nk5QdXGReQzo69imvy/wB9dO3STM7I7ObkD4+L8TqxKXyLjpF7AdWdj2VR8TJiNjznwJwq7P4jZxjLRgi7txtoy13WttAyk91QKAPj7p7CVtG7a9GtbdGOdeM/2j/L1WSyYutCI7kgBFZiT2AA2SYHhHsn4KuZxK98isWVV1222qdhTa7ry7A7/v8ATsdTP9bq3rBE+sveaKURQiIqKCSFRQqgkknoPmSZo5W4H88+NsxczimUcfms5rkorUDTNaoWrlAP8Q1OOY/rd3uY7THD1E/7v+Hrfs48LHhuIVtCftd7F8hkbmAAJFaBtDsD+rN3nVWPOXkZbxbUV8IdrlmTqntPpDcNuckg0vVYvzJPl6P2czDkxvG9D2Zea8iNecS8Z8F8NGVxLDpaoW1mwNdWRtTUvVi38P8Avr1mGON2iHpcq3Rjtbens3iLwVjX0BMaqjFtQgo9dQUFQD7pA136dSDqb5ePW0doeZxuflxW3aZmPTbzDO8DcXdMa1MUW+bXzMiulT0sT+V1sI660fvr0nPXjzEdno29o0tMxM+H93Gca4JxLhlNdmSldCXWitALUsdn5S3VVJGgFPX5/OaxjtWGE8jFlvEebmfC3gLL4jjV5n7dXRVYbAqilms912Q7ClR3U+smtJtG9s8vJpitNenbstHsfxzo35+XafXkWusf6g0vGGPOWE863lWH0cQ9kfD2q5KLL6bgdi93N2xo+6yHQ1vR6aPSTOKPJWvNvvv3h5zxzgj8Peq6prKcmh0S+stzPRkcpKXVPoc9NgViCR0IKmY3jp7w78F4ybie8fePT5w9y8OcVGbh42WAAbawXUdlsHuuPswM6a23G3kZsfu7zX0cgZZmyYEhAIGhCWhA2IFED88k2cp8oVmzprzWZUA+J0Dv6dPqIHCHwyLrFuzr2y2U7WnkFeKvy8vrsfU9fXcnY53GoSpEqrVUrrVUrRRpUQDSqB6ADpIH6wOke1HxCtGK2EhDZGSAjVjqy0sdHoPVvygeuzL1jznwRO57R4v29lfAv2TBFrjWRlMbbgQQ1YGwtRB6gr12D2JaZV79/VtlnwpHhH+7dzlmT5OKrupyb7Ka0V3sevlD8gGz7xB5R0PUdfpCYeG+xqhrOK1sw2a6sm2zfXqVC9fvZMdf1XbF/wD1NfF79NnCQPLvap4oV1bh1LBlHvZLjqCw6rWD8iAT8wB8ZhyI/pu/2bH9eJ+E/Z9/sc4RVXhHO1u/JexCx/cqrcqFX6kEn7fARgrqu1vaOSZydHlH/b0CbvOSB4n7eOJBsvCxg2/2ep7XX057WAXfzC17/mlbd4lrhnV6z8XqPgzBONw7AoYadcesuPhYw53H6sYpGqxBnt1ZLT8XMyzJDA859tOLU2Ni3Eot63FE6e/ZWVJdd/AaDdfh85z8j8r0fZsz1zHlpynspBHCMbfrZlEfTz3l8X5WPO/+0/t9nbDNXIyYQQEDQhKiBsQNCBYCBYHFcVuzmJqxKal7c2Vk2AIB/BWuyT/mAH1gcZwfwald4zsm5snND862dURDylSOX978x6ntoa1qWtbcaREadqlUkDpXtW44uPgvihj52WrV+6dFKP3236bHuj6n4S1a7lEzp8nse8PNj41mbapW3MKmsHoy4w/IT8OYkt9OWZx3mbN8k6rGOPLx+cvQZZi+HiWFZeOQZD01Ee+KlUWt/Od6Hy194Hivtbw6MTLwcbHXlIostuZmLM/O/Km/h/0n6DXeZ5o3Xu6uHea5Y09M9l1ZXhGFv979of7NkWEf01Iw/khPOnee37fZ2uauR8PGuK04dFmTcwWtB22AXb0Ub9TA8T8KcKfjfF3y8hfwVsORkHlJRivL5dAbXwK9O/KPnItHk1pPT+L6PdzJZECGB4P7aeLm3iddAb8PCpCEf+dbp3/0ir9JTJG6t+Naa5YeteDMQ0cN4fUw0wxqmcfB3HOw/VjJpGqwrnt1ZLT8XMGWZMwggIFEJagUQNiBRAsBAsCwEDgvEPiirEIpRHyc1huvEpBezX+J+UHlX7bPpJiNjq3CvB2RnZQ4hxRVKljvDsB95Ap5dqDpUDa9w9xvf8VrWjWoRXtO/N6HjULWiVIOVEVURdk8qgaA2ZRMzt+kBA/nX2gZbZ/FbTV7/NdXjY6g75ghCKB/mbmP80i8ao148byx8O/0e+cE4eMXFxsUHYoprq3/AIiqgE/c7MVjURCuS/XebT5voybHVGZK/Mca5U5lTZ36sew9ZKjpvGPCGVxJ1fNyUqrU+7TjlrAF9QOYABj8fek7gdp4PwunDorxcdOSmvm5QTzHZJJJY9Sevc9ZA+yBDA+Pi3Ea8Wi7JtOq6kLN8T8FHzJ0B9YH8++H+FW8a4vuwEpZc2VlnuqU82yoPwPRB9flFo7aXpOvxP6JhRkwJCCAgIGhCVEDQgaEDUBAQLAQM1UonMURFLsWcqoUsx7ltdz84G4CAgdW8feJBhY5rrO8u5StYB61oehsP/x8/oZateqVbTp1n2ZeESbE4tk6Pu/8nX0PQjl80/boo+p+EZNTPyXpbprPrL0+VQkCQEBA+bNzK6ENtrqiD1J7n4Aep+UDyzxZl53F7FoxaXbHUnkrHLyFgD71th6L8uvTsN+t9a8UO6+DPClXC6WRHay67kbItYABnG9BR+6o5iANn49yd0Wme2nYDCGTCCAgICBRA0ISogaBgagWAgIFgICAgfLxK61KmainzrugRCyouz+8xJHujuddfhA6rw7wOz2nK4jkftNzEM1SDVWx+6WPUr8gFHp1l+vtqEdPq7kiBQFVQqjsqgAD17CUS1AkBAQJA+bJwqbGR7KarHTfI1lauU335SR07DtA/X+3wgQwMmEJAQEBAQECiEtCBRA0DAsCwLAQEBAQEBAQEBAkCQITAzAhMDJgSEEBAQEBAQECgwlqBdwKDA1uBdwECwEBAQEBAkBAm4EJgZ3AhMCEwMwggICAgICAgICBQYS1Au4F3Au4F3AbgWAgICBNwG4E3Am4E3AkDJMCQggICAgICAgICAgIFgXcJWBdwG4F3AbgXcBuBNwG4E3AbgSBCYEhCQEBAQEBAQEBAQEBAQEBAu4Su4DcCwG4DcBuA3AbgTcBuBNwJCCAgICAgICAgICAgICAgICAgIDcC7hJuA3AbgNwG4E3CCAgICAgICAgICAgICAgICAgICAgICAgDAQEAICAgICAgICAgICAgICB/9k=",
  },
];
