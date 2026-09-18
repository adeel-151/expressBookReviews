Start-Sleep -Seconds 3

$regCmd = 'curl.exe -s -X POST -H "Content-Type: application/json" -d "@data.json" http://127.0.0.1:5000/register'
Invoke-Expression $regCmd

$loginCmd = 'curl.exe -s -c cookie.txt -X POST -H "Content-Type: application/json" -d "@data.json" http://127.0.0.1:5000/customer/login'
$loginOut = Invoke-Expression $loginCmd
"cURL command:`n$loginCmd`n`nOutput:`n$loginOut" | Out-File -Encoding utf8 login.txt

$addRevCmd = 'curl.exe -s -b cookie.txt -X PUT "http://127.0.0.1:5000/customer/auth/review/1?review=AwesomeBook"'
$addRevOut = Invoke-Expression $addRevCmd
"cURL command:`n$addRevCmd`n`nOutput:`n$addRevOut" | Out-File -Encoding utf8 reviewadded.txt

$delRevCmd = 'curl.exe -s -b cookie.txt -X DELETE http://127.0.0.1:5000/customer/auth/review/1'
$delRevOut = Invoke-Expression $delRevCmd
"cURL command:`n$delRevCmd`n`nOutput:`n$delRevOut" | Out-File -Encoding utf8 deletereview.txt
