import Address from "js/addressService";
export default {
  data() {
    return {
      type: this.$route.query.type,
      instance: this.$route.query.instance,
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      isInitVal: false,
      name: "",
      tel: "",
      address: "",
      id: "",
      isDefault: false,
      addressList: require("js/address.json"),
      cityList: null,
      districList: null,
      wrong: false,
    };
  },
  created() {
    this.bindValue();
  },
  methods: {
    checkUserInfo() {
      let testPhone = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6}$/g
      let testName = /^\S{1,9}$/g
        let {provinceValue, cityValue, districtValue, name, tel, address} = this;
      if (!testName.test(name)) {
        console.log(name)
        alert('请输入正确的用户名！')
        this.wrong = true
        return
      }
      if (!testPhone.test(tel)) {
        alert('请输入正确的手机号！')
        this.wrong = true
        return
      }
      if (provinceValue == -1 || cityValue == -1 || districtValue == -1) {
        alert('请选择地区！')
        this.wrong = true
        return
      }
      if (address === '') {
        alert('请输入详细地址！')
        this.wrong = true
        return
      }
      this.wrong = false
    },
    setDefault() {
      Address.setDefault(this.id).then(res => {
        this.$router.go(-1);
      });
    },
    remove() {
      if (window.confirm('确认删除吗？')) {
        Address.remove(this.id).then(res => {
          this.$router.go(-1);
        });
      }

    },
    save() {
      this.checkUserInfo()
      if (this.wrong) return
        let {provinceValue, cityValue, districtValue, name, tel, address} = this;
        let data = { provinceValue, cityValue, districtValue, name, tel, address};
      switch (this.type) {
        case 'edit':
          data.id = this.id;
          data.isDefault = this.isDefault;
          Address.update(data).then(res => {
            this.$router.go(-1);
          });
          break;
        case 'add':
          Address.add(data).then(res => {
            this.$router.go(-1);
          });
          break;
        default:
          return
          break;
      }
    },
    bindValue() {
      if (this.type === "edit") {
        let userInfo = this.instance;
        let {
          provinceValue,
          cityValue,
          districtValue,
          name,
          tel,
          address,
          id,
          isDefault
        } = userInfo;
        this.provinceValue = parseInt(provinceValue);
        this.cityValue = parseInt(cityValue);
        this.districtValue = parseInt(districtValue);
        this.isInitVal = true;
        this.name = name;
        this.tel = tel;
        this.address = address;
        this.id = id;
        this.isDefault = isDefault;
      }
    }
  },
  watch: {
    provinceValue(val) {
      if (val === -1) return;
      let index = this.addressList.list.findIndex(item => {
        return item.value === val;
      });
      this.cityList = this.addressList.list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
      if (this.type === "edit" && this.isInitVal) {
        this.cityValue = parseInt(this.instance.cityValue);
      }
    },
    cityValue(val) {
      if (val === -1) return;
      let index = this.cityList.findIndex(item => {
        return item.value === val;
      });
      this.districList = this.cityList[index].children;
      this.districtValue = -1;
      if (this.type === "edit" && this.isInitVal) {
        this.districtValue = parseInt(this.instance.districtValue);
        this.isInitVal = false;
      }
    }
  }
};
