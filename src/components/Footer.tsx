const Footer = () => {
    return (
        <div className="bg-[rgba(0,0,0,0.05)] px-4 pt-3 pb-8 text-gray-0">
            <div className="mx-auto">
                {/* Company Name */}
                <h3 className="text-base font-bold mb-2.5 leading-[125%]">MyCoffee.Ai</h3>
                
                {/* Company Information */}
                <div className="space-y-1 text-[10px] font-normal leading-[150%]">
                    <p>(주)아로마빌 커피</p>
                    <p>대표 : 노환걸</p>
                    <p>18530 경기도 화성시 팔탄면 서해로987번길 23 (주)아로마빌커피</p>
                    <p>사업자등록번호 : 122-81-68406</p>
                    <p>대표전화번호 : 070-7721-8181</p>
                    <p>통신판매업 : 제 2018-화성팔탄-0052호</p>
                    <p>이메일 : aromaville@aromaville.co.kr</p>
                    <p>개인정보관리책임 : 노환결 (aromaville@aromaville.co.kr)</p>
                    <p>Copyright ⓒ MyCoffee.AI All Rights Reserved.</p>
                    <p>이용약관  개인정보취급방침</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
