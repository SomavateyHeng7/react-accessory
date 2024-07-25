import { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import productList from './accessory-products.json';
import DataTable from './components/DataTable';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);

  useEffect(() => {
    setFilteredSelectedItems(selectedItems);
  }, [selectedItems]);

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find(p => p.id == pid);
    const q = qRef.current.value;
    setSelectedItems(prevItems => [
      ...prevItems,
      {
        ...product,
        qty: q
      }
    ]);
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find(p => p.id == pid);
    const p = product.price;
    setPrice(p);
  };

  const deleteItemByIndex = (index) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const search = (keyword) => {
    setFilteredSelectedItems(selectedItems.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())));
  };

  const sortAscending = () => {
    setFilteredSelectedItems(prevItems => [...prevItems].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortDescending = () => {
    setFilteredSelectedItems(prevItems => [...prevItems].sort((a, b) => b.name.localeCompare(a.name)));
  };

  return (
    <>
      <Container>
        <Row className="mb-3">
          <Col xs={2}>
            <span>Product:</span>
          </Col>
          <Col>
            <Form.Select ref={pRef} onChange={handleProductChanged}>
              {productList.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            Price:
          </Col>
          <Col>
            {price}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={2}>
            <span>Quantity:</span>
          </Col>
          <Col>
            <input type="number" ref={qRef} defaultValue={1} className="form-control" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="dark" onClick={handleAdd}>Add</Button>
          </Col>
        </Row>
        <DataTable
          data={filteredSelectedItems}
          onDelete={deleteItemByIndex}
          onSearch={search}
          onSortAscending={sortAscending}
          onSortDescending={sortDescending}
        />
      </Container>
    </>
  );
}

export default App;
