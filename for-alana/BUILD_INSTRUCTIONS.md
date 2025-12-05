# Build Instructions

## Prerequisites

1. **Install .NET SDK**
   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
   - Choose the SDK (not just runtime)
   - Verify installation: `dotnet --version`

2. **Install Visual Studio (Optional but Recommended)**
   - Download Visual Studio 2022 Community (free): https://visualstudio.microsoft.com/
   - Select ".NET desktop development" workload during installation

## Build Methods

### Method 1: Command Line (Fastest)

Open PowerShell or Command Prompt and navigate to the project folder:

```powershell
# Navigate to the project directory
cd c:\GitHub5\windsurf-demo\for-alana

# Restore NuGet packages
dotnet restore

# Build the project in Release mode
dotnet build --configuration Release

# Run the application
dotnet run --configuration Release
```

### Method 2: Visual Studio (Easiest)

1. Double-click `NetworkScanner.sln` to open in Visual Studio
2. Wait for NuGet packages to restore (bottom left status)
3. Select "Release" configuration from the dropdown (top toolbar)
4. Press **Ctrl+Shift+B** to build
5. Press **F5** to run with debugging or **Ctrl+F5** to run without debugging

### Method 3: Visual Studio Code

1. Open the folder in VS Code
2. Install "C# Dev Kit" extension if prompted
3. Open terminal in VS Code (**Ctrl+`**)
4. Run:
   ```powershell
   dotnet build --configuration Release
   dotnet run --configuration Release
   ```

## Build Output

After building, executables are located in:
- Debug: `bin\Debug\net8.0-windows\NetworkScanner.exe`
- Release: `bin\Release\net8.0-windows\NetworkScanner.exe`

## Creating a Standalone Executable

To create a self-contained executable that doesn't require .NET installation:

```powershell
# For Windows 64-bit
dotnet publish --configuration Release --runtime win-x64 --self-contained true --output ./publish

# For Windows 32-bit
dotnet publish --configuration Release --runtime win-x86 --self-contained true --output ./publish

# Single-file executable (larger but more portable)
dotnet publish --configuration Release --runtime win-x64 --self-contained true /p:PublishSingleFile=true --output ./publish
```

The executable will be in the `./publish` folder.

## Build Configurations

### Debug Configuration
- Includes debugging symbols
- No optimizations
- Larger file size
- Easier to debug
- Use during development

### Release Configuration
- Optimized code
- No debugging symbols
- Smaller file size
- Better performance
- Use for distribution

## Troubleshooting

### Error: "The specified framework 'Microsoft.WindowsDesktop.App' version 8.0.0 was not found"
**Solution**: Install .NET 8.0 Desktop Runtime from https://dotnet.microsoft.com/download/dotnet/8.0

### Error: "Could not find a part of the path"
**Solution**: Ensure you're in the correct directory. Use `cd` command to navigate.

### Error: "MSBuild version 17.X.X doesn't match expected version"
**Solution**: Update Visual Studio or use `dotnet build` instead of MSBuild directly.

### Warning: "NU1701: Package 'X' was restored using '.NETFramework,Version=v4.6.1' instead of the project target framework"
**Solution**: This is usually safe to ignore. The package is compatible.

### NuGet Restore Issues
**Solution**: 
```powershell
# Clear NuGet cache
dotnet nuget locals all --clear

# Restore packages
dotnet restore --force
```

## Build Performance Tips

1. **First Build**: May take 2-5 minutes (downloads packages)
2. **Subsequent Builds**: ~10-30 seconds
3. **Incremental Builds**: Only rebuilds changed files
4. **Clean Build**: Use `dotnet clean` then `dotnet build`

## Distribution Checklist

Before distributing the application:

- [ ] Build in Release configuration
- [ ] Test on a clean machine without Visual Studio
- [ ] Include README.md and USAGE_GUIDE.md
- [ ] Consider code signing for Windows SmartScreen
- [ ] Create installer (optional, see below)

## Creating an Installer (Optional)

### Using WiX Toolset
1. Install WiX Toolset: https://wixtoolset.org/
2. Create a WiX installer project
3. Package the published files

### Using Inno Setup
1. Download Inno Setup: https://jrsoftware.org/isinfo.php
2. Create setup script
3. Compile installer

### Using ClickOnce
1. In Visual Studio, right-click project
2. Select "Publish"
3. Follow the wizard

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build

on: [push]

jobs:
  build:
    runs-on: windows-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
    - name: Restore
      run: dotnet restore
    - name: Build
      run: dotnet build --configuration Release
    - name: Test
      run: dotnet test --no-build --verbosity normal
    - name: Publish
      run: dotnet publish --configuration Release --output ./artifacts
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: NetworkScanner
        path: ./artifacts
```

## Version Management

Update version in `NetworkScanner.csproj`:

```xml
<Version>1.0.0</Version>
<AssemblyVersion>1.0.0.0</AssemblyVersion>
<FileVersion>1.0.0.0</FileVersion>
```

## Code Signing (Windows)

For production distribution:

```powershell
# Sign executable (requires code signing certificate)
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com bin\Release\net8.0-windows\NetworkScanner.exe
```

## Performance Optimization

Build with additional optimizations:

```powershell
dotnet build --configuration Release /p:Optimize=true /p:DebugType=none /p:DebugSymbols=false
```

## Additional Resources

- [.NET CLI Documentation](https://docs.microsoft.com/en-us/dotnet/core/tools/)
- [MSBuild Reference](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild)
- [WPF Documentation](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/)
- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)

---

**Need Help?** Open an issue or consult the main README.md file.
