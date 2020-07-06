import React, { Fragment, useState, useEffect } from "react";
import { Form, Row, Col, Select, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { actSearch } from "../../actions";

const Search = (searchs) => {
  const [state, setState] = useState("");
  const [kinds, setKinds] = useState("");

  const dispatch = useDispatch();
  const handleKeyword = (searchs) => dispatch(actSearch(searchs));

  function handleChange(e) {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setState({
      ...state,
      [name]: value,
    });
  }
  function handleSelect(value) {
    if (value === undefined) {
      return setKinds(searchs[0].selects[0].value);
    } else if (value) return setKinds(value);
  }

  useEffect(() => {
    handleSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit() {
    handleKeyword({ kinds: kinds, keyword: state.keyword });
  }

  const { Option } = Select;

  const showSearchContent = (searchs) => {
    return (
      <Fragment>
        {searchs.map((search, index) => {
          return (
            <Col className="gutter-row" key={index} span={8}>
              <Form.Item label={search.label}>
                {search.selects === undefined ? (
                  <Input name="keyword" onChange={handleChange} />
                ) : (
                  <Select
                    defaultValue={search.selects[0].value}
                    style={{ width: 200 }}
                    onChange={handleSelect}
                  >
                    {search.selects.map((option, index) => {
                      return (
                        <Option key={index} value={option.value}>
                          {option.text}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Form>
      <Row gutter={16} style={{ padding: 10 }}>
        {showSearchContent(searchs)}
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={4}>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Tìm (Search)
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
