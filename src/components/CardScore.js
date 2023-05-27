import { Card, Tag } from "antd";

const CardScore = ({ metric, value, comparison = null }) => {
  const color = comparison === 0 ? "yellow" : comparison > 0 ? "green" : "red";

  return (
    <Card
      size="large"
      // extra={<a href="#">More</a>}
    >
      <p className="tw-text-base tw-text-red-900">{metric}</p>
      <p className="tw-text-2xl	">
        <span style={{ marginRight: "8px" }}>{value}</span>
        {comparison !== null && (
          <Tag color={color}>
            {comparison > 0 ? `+${comparison}%` : `${comparison}%`}
          </Tag>
        )}
      </p>
    </Card>
  );
};

export default CardScore;
