import {
  listInterfaceInfoByPageUsingGet,
  listInterfaceInfoBySearchTextPageUsingGet,
} from '@/services/api-backend/interfaceInfoController';
import ProCard from '@ant-design/pro-card';
import { history } from '@umijs/max';
import { Badge, Card, Image, List, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';

const InterfaceSquare: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [total, setTotal] = useState<number>();
  const [pageSize] = useState<number>(12);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async (current = 1) => {
    setLoading(true);
    const res = await listInterfaceInfoByPageUsingGet({
      current: current,
      name: searchText,
      pageSize: pageSize,
      sortField: 'total_invokes',
      sortOrder: 'descend',
      description: searchText,
    });
    if (res.code === 0 && res.data) {
      setData(res?.data?.records || []);
      setTotal(res.data.total);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSearch = async () => {
    const res = await listInterfaceInfoBySearchTextPageUsingGet({
      current: 1,
      searchText: searchText,
      sortOrder: 'descend',
    });
    if (res.data) {
      setData(res?.data?.records || []);
      setTotal(res?.data?.total || 0);
    }
  };

  return (
    <>
      <Card hoverable>
        <ProCard layout="center">
          <Search
            showCount
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            allowClear
            size={'large'}
            maxLength={50}
            enterButton="搜索"
            placeholder={'没有找到心仪的接口？快搜索一下吧'}
            onSearch={onSearch}
            style={{ maxWidth: 600, height: 50 }}
          />
        </ProCard>
      </Card>
      <br />
      <Spin spinning={loading}>
        <List
          pagination={{
            onChange: (page) => {
              loadData(page);
            },
            pageSize: pageSize,
            total: total,
          }}
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <ProCard key={item.id} bordered hoverable direction="column" style={{ height: 236 }}>
                <ProCard
                  layout="center"
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                >
                  <Badge count={item.totalInvokes} overflowCount={999999999} color="#eb4d4b">
                    <Image
                      style={{ width: 70 }}
                      src={item?.avatarUrl ?? '/assets/logo_title.png'}
                      fallback={'/assets/logo_title.png'}
                      alt={item.name}
                      preview={false}
                    />
                  </Badge>
                </ProCard>
                <ProCard
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                  layout="center"
                  style={{ marginTop: -10, fontSize: 16 }}
                >
                  {item.name}
                </ProCard>
                <ProCard
                  onClick={() => {
                    history.push(`/interface_info/${item.id}`);
                  }}
                  layout="center"
                  style={{ marginTop: -18, fontSize: 14 }}
                >
                  {!item.description
                    ? '暂无接口描述'
                    : item.description.length > 15
                    ? item.description.slice(0, 15) + '...'
                    : item.description}
                </ProCard>
              </ProCard>
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};

export default InterfaceSquare;
