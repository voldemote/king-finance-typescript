import { useEffect, useState } from 'react';
import { StakingInfoModal } from 'src/components/modal/staking';
import { StakingInfoIcon } from 'src/config/images';
import { getFreeData } from 'src/contract';
import { commaSeparators } from 'src/utils/commaSeparators';
import styled from 'styled-components';

export const StakingStatus = () => {
  const [freeData, setFreeData] = useState<Array<string | number>>([]);
  const [isStakingModalOpen, setStakingModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const _freeData = await getFreeData();
      setFreeData(_freeData);
    })();
  }, []);

  return (
    <StakingStatusContainer>
      <StakingStatusText>
        <StakingStatusGroup1>
          <StatusText title="Total Locked" value={commaSeparators(freeData[0] ?? 0)} isFlag={true} />
          <StatusText title="User Rewards claimed" value={commaSeparators(freeData[1] ?? 0)} />
        </StakingStatusGroup1>
        <StakingStatusGroup2>
          <StatusText title="KING price" value={`${commaSeparators(freeData[3] ?? 0)} $`} />
          <StatusText title="APY" value={`${commaSeparators(freeData[2] ?? 0)}%`} />
          <StatusText title="TVL" value={`${commaSeparators(freeData[4] ?? 0)} $`} />
          <StakingInfo onClick={() => setStakingModalOpen(true)}>
            <Img src={StakingInfoIcon} alt="info-icon" />
          </StakingInfo>
          <StakingInfoModal isState={isStakingModalOpen} setState={setStakingModalOpen} />
        </StakingStatusGroup2>
      </StakingStatusText>
    </StakingStatusContainer>
  );
};

const StakingStatusContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StakingStatusText = styled.div`
  padding-top: 90px;
  display: flex;
  align-items: center;
  gap: 90px;

  @media screen and (max-width: 1024px) {
    gap: 35px;
    flex-direction: column;
  }
`;

interface StatusTextProps {
  title: string;
  value: string | number;
  usdValue?: string | number;
  isFlag?: boolean;
}

export const StatusText = (props: StatusTextProps) => {
  const { title, value, usdValue, isFlag } = props;
  return (
    <StatusTextContainer>
      <StatusTitle flag={isFlag}>{title}</StatusTitle>
      <StatusValue>{value}</StatusValue>
      {usdValue && <StatusValue>({usdValue} $)</StatusValue>}
    </StatusTextContainer>
  );
};

const StatusTextContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  @media screen and (max-width: 840px) {
    gap: 11px;
  }
`;

interface StatusTitleProps {
  flag?: boolean;
}

const StatusTitle = styled.div<StatusTitleProps>`
  color: #fed27d;
  font-size: 15px;
  text-align: center;
  font-family: 'gotham-bold';
  line-height: 20px;
  @media screen and (max-width: 840px) {
    width: ${(props) => (props.flag ?? false ? '48px' : '120px')};
  }
  @media screen and (max-width: 450px) {
    font-size: 13px;
    width: ${(props) => (props.flag ?? false ? '48px' : '105px')};
  }
`;

const StatusValue = styled.div`
  font-size: 15px;
  font-family: 'gotham-thin';
  font-weight: 800;
  @media screen and (max-width: 450px) {
    font-size: 13px;
  }
`;

const StakingStatusGroup1 = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
  @media screen and (max-width: 960px) {
    gap: 37px;
  }
`;

const StakingStatusGroup2 = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  @media screen and (max-width: 960px) {
    gap: 45px;
  }

  @media screen and (max-width: 540px) {
    gap: 30px;
  }

  @media screen and (max-width: 450px) {
    gap: 10px;
  }

  @media screen and (max-width: 390px) {
    gap: 0px;
  }
`;

const StakingInfo = styled.div`
  width: 31px;
  height: 31px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
