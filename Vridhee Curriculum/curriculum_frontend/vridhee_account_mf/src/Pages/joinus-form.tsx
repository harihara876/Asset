import AppInput from 'vridhee_common_component_mf/AppInput';
import AppButton from 'vridhee_common_component_mf/AppButton';
import Checbox from 'vridhee_common_component_mf/Checbox';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LoginService } from "../Services/loginService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import OtpInputCode from "./otpInput"
import { eye } from 'react-icons-kit/feather/eye'
import Icon from 'react-icons-kit';
import PasswordStrengthMeter from "./passwordStrengthMeter";
import Dropdown from "vridhee_common_component_mf/Dropdown";
import configJson from "vridhee_common_component_mf/configJson"
import ImageUploader from 'react-image-upload'
import { useLocation } from 'react-router-dom';
import 'react-image-upload/dist/index.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CountrySelect from './countrySelect';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let fileData: any;
let emailOTP: string;
let disableFlag: boolean = true
let otpFlag: boolean
let mobileOtpFlag: boolean

const options = [
  { label: "Male", name: 'Male' },
  { label: "Female", name: 'Female' },
  { label: "Others", name: 'Others' }
];
interface CountryType {
  code: string;
  label: string;
  phone: string;
  icon?: any;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Republic of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
export default function JoinusForm() {

  const uploadedImage = React.useRef(null);
  let [userCount, setUserCount] = useState('');
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  })
  const [dobError, setDobError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [namecolor, setNameColor] = useState('')
  const [mobilecolor, setMobileColor] = useState('')

  const navigate = useNavigate();


  const [otp, setOtp] = useState('');
  const [emailotp, setEmailOtp] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('password');
  const [pwdtype, setPwdType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [pwdicon, setPwdIcon] = useState(eyeOff);
  const [file, setFile] = useState('')
  const assetUrl = configJson.local.assetUrl;

  const [checked, setChecked] = useState(true);

  const handleImageUpload = (e: any) => {
    const data = e.target.files[0]
    fileData = e.target.files[0]
    if (!data.name.match(/\.(jpg|jpeg|png)$/)) {
      toast.error('Please select .jpg or .jpeg or .png image only');
    } else {
      setFile(data)
    }
    e.target.value = ''
  }

  const location = useLocation();

  const Validation = () => {
    let date1 = new Date(dob).toDateString();
    let date2 = new Date(new Date()).toDateString();

    if (!name) {
      toast.error("Usename Required");
    }
    else if (!location.state.email && !email) {
      toast.error("Email Required");
    }
    else if (date1 == date2) {
      toast.error("Date of Birth Required");
    }
    else if (!gender) {
      toast.error("Gender Required");
    }
    else if (!location.state.mobile && !phone) {
      toast.error("Mobile Number Required");
    }
    else if (!file) {
      toast.error("Please upload profile picture");
    }
    else if (!pwdInput.password) {
      toast.error("Password Required");
    }
    else if (!input.confirmPassword) {
      toast.error("Confirm Password Required");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      disableFlag = false
    } else {
      disableFlag = true
    }
    setChecked(event.target.checked);
  };

  useEffect(() => {
    LoginService.getUsersCount()
      .then(res => {
        if (res.data.data) {
          setUserCount(res.data.data)
        }
        else {
          toast.error(res.data.msg);
        }
      })
      .catch(e =>
        console.log(e)
      );
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Validation();
    var emailValue = location.state.email ? location.state.email : email
    var mobileValue = location.state.mobile ? location.state.mobile : phone
    const obj = {
      "act_typ": [
        {
          "typ_id": localStorage.getItem('id'),
          "sub_typ_id": "82d156c6-26e1-11ee-a743-c018502fc554",
          "is_actv": 1
        }
      ],
      "email": emailValue,
      "user_pwd": pwdInput.password,
      "cont_num": mobileValue,
      "disp_name": name,
      "vdisp_name": name,
      "dob": dob,
      "gender": gender,
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("data", JSON.stringify(obj))
    if (name && (email || location.state.email) && input.confirmPassword && pwdInput.password && gender && file && (phone || location.state.mobile)) {
      LoginService.signup(formData)
        .then(res => {
          if (res.data.status == 201) {
            const data = { type: localStorage.getItem('actorType') };
            navigate("/login", { state: data });
            toast.success('User Registration Success!');
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch(err => {
          toast.error(err.message);
        });
    }

  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const handlePwdToggle = () => {
    if (pwdtype === 'password') {
      setPwdIcon(eye);
      setPwdType('text')
    } else {
      setPwdIcon(eyeOff)
      setPwdType('password')
    }
  }


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const validateInput = (e: any) => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj: any = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
            disableFlag = true
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
            disableFlag = true
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
            disableFlag = false
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
            disableFlag = true
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
            disableFlag = true
          } else {
            disableFlag = false
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }



  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [isError, setPwdError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));


    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
    setPwdError('');
    let caps, small, num, specialSymbol;
    if (password.length < 4) {
      setPwdError(
        "Password should contain atleast 8 characters");
      return;
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        setPwdError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setPwdError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setPwdError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setPwdError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
    validateInput(e);
  };
  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData: any) => {
    initRobustPassword(childData);
  };


  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [emailopen, setEmailOpen] = useState(false);

  const handleOpen = () => {

    const body = {
      "checkEmail": false,
      "emailOrContactNumber": phone
    }
    LoginService.checkEmailAndContactNumber(body)
      .then(res => {
        if (res.data.status == 200) {
          setOpen(true);
        } else {
          setOpen(false);
          toast.error(res.data.message)
        }
      })
  }

  const emailhandleOpen = () => {

    const body = {
      "checkEmail": true,
      "emailOrContactNumber": email
    }
    LoginService.checkEmailAndContactNumber(body)
      .then(res => {
        if (res.data.status == 200) {
          setEmailOpen(true);
          const body = {
            "email": email
          }
          LoginService.sendOtpForEmailVerification(body)
            .then(res => {
              if (res.data.data.OTP) {
                emailOTP = res.data.data.OTP;
              } else {
                toast.error(res.data.msg)
              }
            })
            .catch(err =>
              toast.error(err.message)
            );
        } else {
          setEmailOpen(false);
          toast.error(res.data.message)
        }
      })
  }
  const emailhandleClose = () => setEmailOpen(false);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    var email = e.currentTarget.value;
    setEmail(e.currentTarget.value);
    if (email) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2})+m$/
      // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        disableFlag = true
      } else {
        setEmailError('');
        disableFlag = false
      }
    }
  }
  const [selectedOption, setSelectedOption] = useState({ code: 'IN', label: 'India', phone: '91' });

  // handle onChange event of the dropdown
  const selecthandleChange = (e: any) => {
    setSelectedOption(e);
  }
  function Verify() {
    if (otp == "1234") {
      handleClose();
      location.state.mobile = phone
    } else {
      toast.error("Incorrect OTP")
    }

  }

  function emailVerify() {
    if (emailotp == emailOTP) {
      emailhandleClose();
      location.state.email = email
    } else {
      toast.error("Incorrect OTP")
    }

  }

  const validateMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    var mobile = e.currentTarget.value;
    setPhone(e.currentTarget.value);
    if (mobile) {
      const mobileRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/
      if (!mobileRegex.test(mobile)) {
        setMobileError('Please enter a valid Mobile Number');
        setMobileColor('red')
        disableFlag = true
      } else {
        setMobileError('Valid Mobile number');
        setMobileColor('green')
        disableFlag = false
      }
    }
  }

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameRegex = /^[a-z][a-z\s]*$/i;
    if (nameRegex.test(e.target.value)) {
      setName(e.target.value);
      setNameError('');
      disableFlag = false
    } else if (!nameRegex.test(e.target.value) && !e.target.value) {
      setName('');
      setNameError('');
      disableFlag = false
    } else if (!nameRegex.test(e.target.value)) {
      setNameError('Name should contain only Alphabets and spaces');
      disableFlag = true
    }
  }

  return (
    <div>
      <div className="page-content">
        <Grid container direction="row">
          <Grid item xs={12} md={5} className="sidebar_login_bg">
            <div className="joinus-left-con">
              <div className="joinus-inner-content">
                <div className="joinus-inner-log">
                  <img src={`${assetUrl}/white-logo.svg`} alt="VRIDHEE" />
                </div>
                <div className="joinus-inner-con">
                  <h4>
                  Adaptive learning based social learning platform
                    {/* A social learning platform A place where learning ≠ boredom */}
                    </h4>
                  <div className="quote-icon position-relative">
                    <p>
                    Vridhee is a social learning platform provided by AI / ML and internet technologies
to make education more inclusive, affordable, equitable, and accessible to all
sections of society bringing the mentors and learners together for a seamless
knowledge sharing experience through adaptive, peer, social and activity based
learning with multilingual curriculum
                      {/* Vridhee is the 1st social learning platform bringing all the teachers and learners together for a seamless knowledge sharing experience through community driven learning with multilingual curriculum using curated web-sourced contents to enable #educationforall */}
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className="position-relative">
              <div className="signup-right-content-form">
                <div className="page-forms pt-3">
                  <div className="text-left ">
                    <div className="donts text-center">
                      <div className="circle1 circle"></div>
                      <div className="circle2 circle"></div>
                      <div className="circle3 circle"></div>
                      <div className="clearfix"></div>
                    </div>
                    <p className="font-w600 m-0 text-center pt-2 pb-2">{userCount} people joined us, now it’s your turn</p>
                    <h4 className="primary-color font-w600 text-left">Join Us…!!!</h4>
                    <p>Please fill the fields below to join us.</p>
                  </div>

                  <form id="joinusData">
                    <div className="form-group">
                      <AppInput type="text" label="Name" name="name" radius="5px" value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateName(e)}
                        placeholder="Riya Yarlapati" />
                      {name ? <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{nameError}</span> : ''}
                    </div>
                    <div className="form-group ">
                      {location.state && location.state.email ? <AppInput type="Email Address" label="Email Address" name="email" radius="5px" value={location.state.email}
                        readonly={location.state.email}
                        placeholder="hello@vridhee.com" /> : <AppInput type="Email Address" label="Email Address" name="email" radius="5px"
                          readonly
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e)}
                          placeholder="hello@vridhee.com" />}
                      {location.state && location.state.email ? <div className="email-error" >
                        <div className="email-verfiy">
                          <p className="green-color m-0"><small>Verified</small></p>
                          <i className="fa fa-check-circle" aria-hidden="true"></i>
                        </div>
                      </div> : <div className="check-btn">
                        <AppButton
                          children="Verify OTP" onClick={emailhandleOpen}
                          disabled={disableFlag}
                          readonly
                          styleClass='verify-btn' />
                      </div>}
                      {email && emailError ? <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{emailError}</span> : ''}
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">When can we wish you Happy Birthday</label>
                      <div className="datepicker">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker disableFuture={true} onChange={(date: any) => {
                              let today = new Date();
                              setDob(date)
                              if (date > today) {
                                setDobError("You can't enter a date in the future!")
                                disableFlag = true
                              } else {
                                setDobError('')
                                disableFlag = false
                              }
                            }
                            } />
                          </DemoContainer>
                        </LocalizationProvider>

                      </div>
                      {dob ? <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{dobError}</span> : ''}
                    </div>
                    <div className="form-group gender-sec">
                      <label>What is your Gender?</label>


                      <Dropdown
                        id="gender"
                        name="gender"
                        options={options}
                        title="Select Gender" selectStyle="w-100"
                        handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                        selectedValue={gender}
                      />
                    </div>

                    <div className="form-group tell-phone">

                      {location.state && location.state.mobile ? <AppInput type="tel" label="How can we reach you?" name="phone" radius="5px" value={location.state.mobile}
                        readonly={location.state.mobile}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateMobile(e)}
                        placeholder="9123456789" /> : <AppInput type="number" label="How can we reach you?" name="phone" radius="5px"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateMobile(e)}
                          placeholder="9123456789" />}
                      <div className="country-code">
                        <Select
                          placeholder="Select Option"
                          value={selectedOption}
                          options={countries}
                          onChange={selecthandleChange}
                          getOptionLabel={(e: any) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={`https://flagcdn.com/w40/${e.code.toLowerCase()}.png`} />
                              <span style={{ marginLeft: 5 }}>+{e.phone}</span>
                            </div>
                          )}
                        />
                      </div>


                      {location.state && location.state.mobile ? <div className="email-error" >
                        <div className="email-verfiy">
                          <p className="green-color m-0"><small>Verified</small></p>
                          <i className="fa fa-check-circle" aria-hidden="true"></i>
                        </div>
                      </div> : <div className="check-btn">
                        <AppButton
                          children="Verify OTP" onClick={handleOpen}
                          disabled={disableFlag}
                          styleClass='verify-btn' />
                      </div>}

                      <span style={{
                        fontWeight: 'bold',
                        color: mobilecolor,
                      }}>{mobileError}</span>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div >
                            <div className="page-forms">
                              <div className="mail-form">
                                <p className="text-center">OTP has been sent  to your Registered mobile number.</p>
                              </div>
                              <form id="otpData" >
                                <div className="opt-sec mb-2 text-center">
                                  <OtpInputCode
                                    value={otp}
                                    onChange={(val: any) => {
                                      setOtp(val);
                                      if (otp.length == 3)
                                        mobileOtpFlag = true;
                                    }}
                                  />
                                  <div className='clearfix'></div>
                                </div>

                                <div className="button-center text-center">
                                  <AppButton
                                    disabled={!mobileOtpFlag}
                                    onClick={Verify}
                                    children="Verify"
                                    styleClass='btn save-btn border-r primary-bg w-100' />
                                </div>


                              </form>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                      <Modal
                        open={emailopen}
                        onClose={emailhandleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div >
                            <div className="page-forms">
                              <div className="mail-form">
                                <p className="text-center">OTP has been sent to your Registered email.</p>
                              </div>
                              <form id="otpData" autoComplete="off" >
                                <div className="opt-sec mb-2 text-center">
                                  <OtpInputCode
                                    value={emailotp}
                                    onChange={(val: any) => {
                                      setEmailOtp(val);
                                      if (emailotp.length == 3)
                                        otpFlag = true;
                                    }}
                                  />
                                  <div className='clearfix'></div>
                                </div>

                                <div className="button-center text-center">
                                  <AppButton
                                    disabled={!otpFlag}
                                    onClick={emailVerify}
                                    children="Verify"
                                    styleClass='btn save-btn border-r primary-bg w-50' />
                                </div>


                              </form>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </div>

                    <div>


                      <div className="upload-btn">
                        <input type="file" multiple onChange={handleImageUpload} />
                        <div className="button mb-2">
                          <AppButton
                            children=""
                            styleClass='btn save-btn w-100 border-r' />
                        </div>
                        <p className="m-0"><i className="fa fa-upload" aria-hidden="true"></i>&nbsp;Upload Picture</p>
                      </div>
                      {file &&

                        <div>
                          <img src={URL.createObjectURL(file)} className='profileImage' />
                        </div>
                      }
                    </div>
                    <div className="form-group position-relative">
                      <AppInput type={type} label="Create New Password" name="password" radius="5px"
                        onChange={onChange}
                        placeholder="Enter your password here" />
                      {input.password ? isError !== null && <p className="errors" style={{ color: 'red', fontWeight: 'bold' }}>  {isError}</p> : ''}
                      <div className="show-password">
                        <span className="flex justify-around items-center" onClick={handleToggle}>
                          <Icon className="absolute mr-10" icon={icon} size={20} />
                        </span>
                      </div>
                      {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
                      <div className="password-info">
                        <div className="password-infoicon">
                          <i className="fa fa-info-circle" aria-hidden="true"></i>
                          <div className="password-ins">
                            <ul>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>Cannot have the old password</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>At least 8 characters long but 14 or more is better.</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>A combination of uppercase letters, lowercase letters, numbers, & symbols.</li>
                              <li><i className="fa fa-circle" aria-hidden="true"></i>Significantly different from your previous passwords.</li>

                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                    {pwdInput.password ? <div className='password-strenght'>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={5}>
                          <p className='m-0'>Password Strength</p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={7}>
                          <PasswordStrengthMeter password={pwdInput.password} actions={initPwdInput} />
                          <div className="clearfix"></div>
                        </Grid>
                      </Grid>

                    </div> : ''}

                    <div className="form-group">
                      <AppInput type={pwdtype} label="Confirm Password" name="confirmPassword" radius="5px"
                        onChange={onInputChange}
                        placeholder="Enter your password here" />

                      <div className="show-password">
                        <span className="flex justify-around items-center" onClick={handlePwdToggle}>
                          <Icon className="absolute mr-10" icon={pwdicon} size={20} />
                        </span>
                      </div>
                      {error.confirmPassword && <span style={{ color: 'red', fontWeight: 'bold' }}>{error.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                      <div className="form-group terms-condition">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy." />
                        </FormGroup>
                        <p>Protected by reCAPTCHA and subject to the <a href="/joinus-form">Vridhee Privacy Policy</a> and <a href="/joinus-form">Terms of Service</a>.</p></div>
                    </div>

                    <div className="button mb-7">
                      <AppButton
                        disabled={disableFlag}
                        onClick={handleSubmit}
                        children="Join"
                        styleClass='btn save-btn w-100 border-r' />
                    </div>
                  </form>

                </div>
              </div>
              <div className="copyright">
                <p className="m-0">© Vridhee 2023</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <ToastContainer />
    </div>
  );
}
